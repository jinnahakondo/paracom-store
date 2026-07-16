import { verifyAuth } from "@/lib/auth/verifyAuth";
import { connectDb } from "@/lib/db/db";
import { response } from "@/lib/helperFunction";
import Cart from "@/schemas/cart.schema";
import { NextRequest } from "next/server";

export default async function POST(req: NextRequest) {
    try {
        await connectDb();
        const { user } = await verifyAuth();

        const cartData = await req.json();

        const cart = Cart.find({ user: user.id })
        const result = await Cart.create(cart);

        return response.success({
            data: result,
            message: "cart data merged"
        })

    } catch (error: any) {
        return response.error({
            message: "failed to merge cart data",
            error: error.message
        })
    }
}