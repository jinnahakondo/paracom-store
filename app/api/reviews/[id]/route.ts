import { verifyAuth, verifyRole } from "@/lib/auth/verifyAuth"
import { connectDb } from "@/lib/db/db"
import { isValidId, response } from "@/lib/helperFunction"
import Review from "@/schemas/review.schema"
import { NextRequest } from "next/server"

interface IParams {
    params: Promise<{ id: string }>
}

export async function GET(req: NextRequest, { params }: IParams) {
    try {
        await connectDb()
        await verifyAuth()

        const { id } = await params

        if (!isValidId(id)) {
            return response.error({
                message: "invalid objectId",
                status: 400,
            });
        }

        const result = await Review.findById(id).lean().exec()

        if (!result) {
            return response.error({
                message: "Review not found",
                status: 404
            })
        }

        return response.success({
            message: "Review fetched successfull",
            data: result
        })

    } catch (error: any) {
        return response.error({
            message: "Failed to fetch Review",
            error: error.message
        })
    }
}

export async function PATCH(req: NextRequest, { params }: IParams) {
    try {
        await connectDb()
        await verifyRole("admin")

        const { id } = await params

        if (!isValidId(id)) {
            return response.error({
                message: "invalid user id",
                status: 400,
            });
        }

        const payload = await req.json()

        const result = await Order.findByIdAndUpdate(
            id,
            payload,
            { new: true, runValidators: true }).exec()

        if (!result) {
            return response.error({
                message: "Order not found",
                status: 404
            })
        }

        return response.success({
            message: "Order updated successfully",
            data: result
        })

    } catch (error: any) {
        return response.error({
            message: 'Failed to update order',
            error: error.message
        })
    }
}

export async function DELETE(req: NextRequest, { params }: IParams) {
    try {
        await connectDb()
        await verifyRole('admin')

        const { id } = await params;

        if (!isValidId(id)) {
            return response.error({
                message: "invalid user id",
                status: 400,
            });
        }

        const result = await Order.findByIdAndDelete(id).exec();

        if (!result) {
            return response.error({
                message: "Order not found",
                status: 404,
            });
        }

        return response.success({
            message: "Order deleted successfull"
        })

    } catch (error: any) {
        return response.error({
            message: "Failed to delete order",
            error: error.message
        })
    }
}