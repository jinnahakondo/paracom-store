import { verifyAuth } from "@/lib/auth/verifyAuth";
import { connectDb } from "@/lib/db/db";
import { response } from "@/lib/helperFunction";
import { stripe } from "@/lib/stripe";
import Cart from "@/schemas/cart.schema";
import Order from "@/schemas/order.schema";
import Product from "@/schemas/product.schema";
import { CartItemType } from "@/types/types";
import { NextRequest, NextResponse } from "next/server";

interface IParams {
    params: Promise<{ sessionId: string }>
}

export async function POST(req: NextRequest, { params }: IParams) {
    try {
        await connectDb()
        const { user } = await verifyAuth()
        const { sessionId } = await params;
        const { items } = await req.json()

        const productIds = items.map((item: CartItemType) => item._id)

        const session = await stripe.checkout.sessions.retrieve(sessionId)

        const transactionId = session.payment_intent;


        // check if already order created 
        const existOrder = await Order.findOne({ "payment.transactionId": transactionId })
        if (existOrder) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Order already created",
                },
                { status: 409 }
            );
        }

        if (session.payment_status === 'paid') {


            const dbProducts = await Product.find(
                { _id: { $in: productIds } }
            )

            const orderItems = items.map((item: CartItemType) => {
                const product = dbProducts.find(p => String(p._id) === item._id)
                if (!product) {
                    throw new Error("Product not found")
                }

                return {
                    productId: product._id,
                    title: product.title,
                    price: product.price,
                    quantity: item.quantity,
                    subtotal: Number(product.price) * Number(item.quantity)
                }
            })

            const subtotal = orderItems.reduce(
                (total: number, item: any) => total + item.subtotal,
                0
            );

            const shippingFee = subtotal >= 1000 ? 0 : 100;

            const newOrder = {
                user: user.id,
                products: orderItems,
                subtotal,
                shippingFee,
                totalAmount: subtotal + shippingFee,
                payment: {
                    paymentStatus: "paid",
                    transactionId,
                }

            }


            const result = await Order.create(newOrder);
            
            // clear cart 
            const itemIds = items.map((item: CartItemType) => item._id)

            await Cart.deleteMany({
                _id: { $in: itemIds }
            })

            return response.success({
                message: "Order created",
                status: 201,
                data: result
            })
        }



        return NextResponse.json({ success: true, sessionId })
    } catch (error: any) {
        return NextResponse.json({ error: error.message })
    }
}