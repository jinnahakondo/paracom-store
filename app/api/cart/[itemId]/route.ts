import { verifyAuth } from "@/lib/auth/verifyAuth"
import { connectDb } from "@/lib/db/db"
import { response } from "@/lib/helperFunction"
import Cart from "@/schemas/cart.schema"
import { NextRequest } from "next/server"

interface IParams {
    params: Promise<{ itemId: string }>
}


export async function PATCH(req: NextRequest, { params }: IParams) {
    try {
        await connectDb()

        const { itemId } = await params;
        const { value } = await req.json()

        const { user } = await verifyAuth()

        const result = await Cart.findOneAndUpdate(
            {
                user: user.id,
                "items._id": itemId,
            },
            {
                $inc: { "items.$.quantity": value }
            },
            { new: true }
        );

        return response.success({
            message: 'quantity updated',
            data: result
        })

    } catch (error: any) {
        return response.error({
            message: "failed to update quantity",
            error: error.message
        })
    }
}

export async function DELETE(req: NextRequest, { params }: IParams) {
    try {
        await connectDb()

        const { itemId } = await params;

        const { user } = await verifyAuth()

        const cart = await Cart.findOneAndUpdate(
            { user: user.id },
            {
                $pull: {
                    items: {
                        _id: itemId
                    }
                }
            },
            { new: true }
        );
        if (!cart) {
            return response.error({
                message: "Cart data not found",
                status: 404,
            });
        }


        return response.success({
            message: "Cart data deleted successfull"
        })

    } catch (error: any) {
        return response.error({
            message: "Failed to delete Cart data",
            error: error.message
        })
    }
}


