import { verifyAuth } from "@/lib/auth/verifyAuth";
import { connectDb } from "@/lib/db/db";
import { response } from "@/lib/helperFunction";
import Cart from "@/schemas/cart.schema";
import { NextRequest } from "next/server";

type Props = {
    params: Promise<{ itemId: string }>
}

export async function DELETE(req: NextRequest, { params }: Props) {
    try {

        await connectDb();
        const { user } = await verifyAuth();
        const { itemId } = await params;

        const result = await Cart.findOneAndDelete(
            {
                user: user.id,
                product: itemId
            }
        )

        return response.success({
            message: "cart item deleted",
            data: result
        })

    } catch (error: any) {
        return response.error({
            message: 'failed to delete cart item',
            error: error.message
        })
    }
}