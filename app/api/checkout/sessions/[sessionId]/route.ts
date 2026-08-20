import { verifyAuth } from "@/lib/auth/verifyAuth";
import { connectDb } from "@/lib/db/db";
import { response } from "@/lib/helperFunction";
import { stripe } from "@/lib/stripe";
import Address from "@/schemas/addressSchema";
import Cart from "@/schemas/cart.schema";
import Order from "@/schemas/order.schema";
import Product from "@/schemas/product.schema";
import { NextRequest, NextResponse } from "next/server";

interface IParams {
    params: Promise<{ sessionId: string }>
}

export async function POST(req: NextRequest, { params }: IParams) {
    try {
        await connectDb();
        const { user } = await verifyAuth();
        const { sessionId } = await params;

        // 1. Retrieve the Checkout Session from Stripe
        const session = await stripe.checkout.sessions.retrieve(sessionId);

        // Verify if the payment was successful
        if (session.payment_status !== 'paid') {
            return NextResponse.json(
                { success: false, message: "Payment has not been completed" },
                { status: 400 }
            );
        }

        const transactionId = String(session.payment_intent);

        // 2. Idempotency Check: Prevent duplicate order creation
        const existOrder = await Order.findOne({ "payment.transactionId": transactionId });
        if (existOrder) {
            return NextResponse.json(
                {
                    success: true,
                    message: "Order already created",
                    data: existOrder
                },
                { status: 200 }
            );
        }

        // 3. Extract cart metadata sent during session creation
        const itemInfoMeta: { productId: string; qty: number }[] = JSON.parse(
            session.metadata?.itemInfo || "[]"
        );

        if (itemInfoMeta.length === 0) {
            throw new Error("No cart items found in payment session metadata");
        }

        const productIds = itemInfoMeta.map(item => item.productId);

        // 4. Fetch real product details from Database
        const dbProducts = await Product.find({ _id: { $in: productIds } });

        // 5. Construct order items using server-side DB pricing
        const orderItems = itemInfoMeta.map((item) => {
            const product = dbProducts.find(p => String(p._id) === item.productId);
            if (!product) {
                throw new Error(`Product not found: ${item.productId}`);
            }

            return {
                productId: product._id,
                title: product.title,
                price: product.price,
                quantity: item.qty,
                subtotal: Number(product.price) * Number(item.qty)
            };
        });

        // 6. Calculate Subtotal and Shipping Fees
        const subtotal = orderItems.reduce(
            (total: number, item: any) => total + item.subtotal,
            0
        );

        const shippingFee = 50;

        //7. Take default address from db
        const address = await Address.findOne({
            user: user.id,
            isDefault: true
        })

        if (!address) {
            return NextResponse.json(
                { error: "No shipping address found for this user" },
                { status: 400 }
            );
        }

        // Format and filter valid address text segments
        const addressParts = [
            address.additionalInfo,
            `${address.city || ''} ${address.postalCode || ''}`.trim(),
            address.district,
            address.division
        ].filter(Boolean);

        const fullAddress = addressParts.join(', ');

        const newOrder = {
            user: user.id,
            products: orderItems,
            subtotal,
            shippingFee,
            totalAmount: subtotal + shippingFee,
            payment: {
                paymentStatus: "paid",
                transactionId,
            },
            shippingAddress: {
                name: address.name,
                phone: address.phone,
                division: address.division,
                district: address.district,
                city: address.city,
                postalCode: address.postalCode || "",
                fullAddress,
            }
        };

        console.log({ address, fullAddress, newOrder });

        // 8. Persist order into Database
        const result = await Order.create(newOrder);

        // 9. Delete ordered items from user's cart
        await Cart.deleteMany({
            user: user.id,
            product: { $in: productIds }
        });

        return response.success({
            message: "Order created successfully",
            status: 201,
            data: result
        });

    } catch (error: any) {
        console.error("Order Creation Error:", error);
        return NextResponse.json(
            { error: error.message || "Failed to create order" },
            { status: 500 }
        );
    }
}