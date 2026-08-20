import { verifyAuth } from "@/lib/auth/verifyAuth";
import { connectDb } from "@/lib/db/db";
import { stripe } from "@/lib/stripe";
import Product from "@/schemas/product.schema";
import { CartItemType } from "@/types/types";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        await connectDb();
        const { user } = await verifyAuth();

        const { items } = await req.json();

        if (!Array.isArray(items) || items.length === 0) {
            return NextResponse.json(
                { error: "Cart is empty" },
                { status: 400 }
            );
        }

        // 1. Find products in DB using productIds
        const productIds = items.map((item: CartItemType) => item.productId);

        const dbProducts = await Product.find({
            _id: { $in: productIds }
        });

        // 2. Validate & format items from Database data
        const itemsForOrder = items.map((item: CartItemType) => {
            const product = dbProducts.find(p => String(p._id) === item.productId);
            if (!product) {
                throw new Error(`Product not found: ${item.productId}`);
            }

            return {
                productId: product._id,
                title: product.title,
                price: product.price,
                quantity: item.quantity,
                images: product.images 
            };
        });

        // 3. Prepare Stripe Line Items
        const line_items = itemsForOrder.map((item) => ({
            price_data: {
                currency: "bdt",
                product_data: {
                    name: item.title,
                    images: item.images, 
                },
                unit_amount: Math.round(Number(item.price) * 100), 
            },
            quantity: item.quantity,
        }));

    //   data for store product id and quantity in metadata
        const orderSummaryData = itemsForOrder.map(i => ({
            id: String(i.productId),
            qty: i.quantity
        }));

        // 5. Create Checkout Session
        const session = await stripe.checkout.sessions.create({
            line_items: [
                ...line_items,
                {
                    price_data: {
                        currency: "bdt",
                        product_data: {
                            name: "Delivery Charge",
                        },
                        unit_amount: 50 * 100,
                    },
                    quantity: 1,
                }
            ],
            mode: 'payment',
            payment_method_types: ['card'],
            customer_email: String(user.email),
            metadata: {
                userId: String(user.id),
                orderSummaryData: JSON.stringify(orderSummaryData),
            },
            success_url: `${process.env.BASE_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${process.env.BASE_URL}/checkout`
        });

        return NextResponse.json({
            url: session.url,
        });

    } catch (error: any) {
        console.error("Stripe Checkout Error:", error);
        return NextResponse.json(
            { error: error.message || "Something went wrong" },
            { status: error.statusCode || 500 }
        );
    }
}