import { verifyAuth } from "@/lib/auth/verifyAuth";
import { connectDb } from "@/lib/db/db";
import { stripe } from "@/lib/stripe";
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

        // take  cart items id []
        const cartItemIds = items.map((item: CartItemType) => item._id);

        const line_items = items.map((item: CartItemType) => ({
            price_data: {
                currency: "bdt",
                product_data: {
                    name: item.title,
                    images: [item.image]
                },
                unit_amount: Number(item.price) * 100,
            },
            quantity: item.quantity,
        }));

        // Create Checkout Sessions from body params.
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
                cartItemIds: JSON.stringify(cartItemIds),
            },
            success_url: `${process.env.BASE_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${process.env.BASE_URL}/checkout`
        })


        return NextResponse.json({
            url: session.url,
        });

    } catch (error: any) {
        console.log(error);
        return NextResponse.json(
            { error: error.message },
            { status: error.statusCode || 500 }
        )
    }
}