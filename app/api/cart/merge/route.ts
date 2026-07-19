import { verifyAuth } from "@/lib/auth/verifyAuth";
import { connectDb } from "@/lib/db/db";
import { response } from "@/lib/helperFunction";
import Cart from "@/schemas/cart.schema";
import { CartItemType } from "@/types/types";
import { NextRequest } from "next/server";

export interface ItemType {
    product: string,
    quantity: number,
}

export async function POST(req: NextRequest) {
    try {
        await connectDb();
        const { user } = await verifyAuth();

        const items = await req.json();

        const cartItems = items.map((item: CartItemType) => ({
            user: user.id,
            product: item._id,
            quantity: item?.quantity || 1
        }))

        await Cart.deleteMany({ user: user.id });

        const result = await Cart.insertMany(cartItems);

        return response.success({
            message: "merged with local cart",
            data: result
        })

    } catch (error: any) {
        return response.error({
            message: "failed to merge cart",
            error: error.message,
        })
    }
}