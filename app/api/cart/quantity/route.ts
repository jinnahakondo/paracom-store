import { verifyAuth } from "@/lib/auth/verifyAuth";
import { connectDb } from "@/lib/db/db";
import { response } from "@/lib/helperFunction";
import { NextRequest } from "next/server";
import Cart from "@/schemas/cart.schema";

export async function PATCH(req: NextRequest) {
    try {
        await connectDb();
        const { user } = await verifyAuth();
        const { product, quantity, type } = await req.json();

        let updateQty;
        if (type === 'INCREMENT') {
            updateQty = 1
        }
        else if (type === 'DECREMENT') {
            updateQty = -1
        } else {
            updateQty = quantity
        }

        const result = await Cart.findOneAndUpdate(
            {
                user: user.id,
                product,
            },
            { $inc: { quantity: updateQty } },
            { new: true }
        );

        return response.success({
            message: "updated cart item quantity",
            data: result,
        })

    } catch (error: any) {
        return response.error({
            message: "failed to update cart item quantity",
            error: error.message
        })
    }
}