import { verifyAuth } from "@/lib/auth/verifyAuth"
import { connectDb } from "@/lib/db/db"
import { isValidId, response } from "@/lib/helperFunction"
import Cart from "@/schemas/cart.schema"
import Review from "@/schemas/review.schema"
import { NextRequest } from "next/server"

interface IParams {
    params: Promise<{ id: string }>
}

export async function GET(req: NextRequest, { params }: IParams) {
    try {
        await connectDb()

        const { id } = await params

        if (!isValidId(id)) {
            return response.error({
                message: "invalid objectId",
                status: 400,
            });
        }

        const result = await Cart.findById(id).lean().exec()

        if (!result) {
            return response.error({
                message: "Cart data not found",
                status: 404
            })
        }

        return response.success({
            message: "Cart data fetched successfull",
            data: result
        })

    } catch (error: any) {
        return response.error({
            message: "Failed to fetch cart data",
            error: error.message
        })
    }
}

export async function PATCH(req: NextRequest, { params }: IParams) {
    try {
        await connectDb()

        const { id } = await params

        if (!isValidId(id)) {
            return response.error({
                message: "invalid objectId",
                status: 400,
            });
        }

        const payload = await req.json()

        const result = await Cart.findByIdAndUpdate(
            id,
            payload,
            { new: true, runValidators: true }).exec()

        if (!result) {
            return response.error({
                message: "Cart data not found",
                status: 404
            })
        }

        return response.success({
            message: "Cart data updated successfully",
            data: result
        })

    } catch (error: any) {
        return response.error({
            message: 'Failed to update Cart data',
            error: error.message
        })
    }
}

export async function DELETE(req: NextRequest, { params }: IParams) {
    try {
        await connectDb()

        const { id } = await params;

        if (!isValidId(id)) {
            return response.error({
                message: "invalid objectId",
                status: 400,
            });
        }

        const result = await Cart.findByIdAndDelete(id).exec();

        if (!result) {
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