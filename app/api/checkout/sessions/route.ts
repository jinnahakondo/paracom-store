import { verifyAuth } from "@/lib/auth/verifyAuth";
import { stripe } from "@/lib/stripe";
import { CartItemType } from "@/types/types";
import { NextRequest, NextResponse } from "next/server";



export async function POST(req: NextRequest) {
    try {
        const { items } = await req.json();

        if (!Array.isArray(items) || items.length === 0) {
            return NextResponse.json(
                { error: "Cart is empty" },
                { status: 400 }
            );
        }

        const line_items = items.map((item: CartItemType) => ({
            price_data: {
                currency: "usd",
                product_data: {
                    name: item.title,
                    images: [item.image]
                },
                unit_amount: Number(item.price) * 100,
            },
            quantity: item.quantity,
        }));

        const { user } = await verifyAuth();

        // Create Checkout Sessions from body params.
        const session = await stripe.checkout.sessions.create({
            line_items,
            mode: 'payment',
            payment_method_types: ['card'],
            metadata: {
                userId: String(user.id),
            },
            success_url: `${process.env.BASE_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${process.env.BASE_URL}/checkout`
        })


        return NextResponse.json({
            url: session.url,
        });

    } catch (error: any) {
        return NextResponse.json(
            { error: error.message },
            { status: error.statusCode || 500 }
        )
    }
}