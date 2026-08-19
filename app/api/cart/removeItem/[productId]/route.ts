import { verifyAuth } from "@/lib/auth/verifyAuth";
import { connectDb } from "@/lib/db/db";
import { response } from "@/lib/helperFunction";
import Cart from "@/schemas/cart.schema";
import { NextRequest } from "next/server";

type Props = {
    params: Promise<{ productId: string }>
}

export async function DELETE(req: NextRequest, { params }: Props) {
    try {

        await connectDb();
        const { user } = await verifyAuth();
        const { productId } = await params;
        console.log(productId);

        const result = await Cart.findOneAndDelete(
            {
                user: user.id,
                product: productId
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