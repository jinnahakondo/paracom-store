import { verifyAuth, verifyRole } from "@/lib/auth/verifyAuth"
import { connectDb } from "@/lib/db/db"
import { isValidId, response } from "@/lib/helperFunction"
import Order from "@/schemas/order.schema"
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
                message: "invalid user id",
                status: 400,
            });
        }

        const result = await Order.findOne({ id }).lean().exec()

        return response.success({
            message: "Order fetched successfull",
            data: result
        })

    } catch (error: any) {
        return response.error({
            message: "Failed to fetch order",
            error: error.message
        })
    }
}

export async function PATCH(req: NextRequest, { params }: IParams) {
    try {
        await connectDb()
        await verifyRole("admin")

        const { id } = await params

        const payload = await req.json()

        const result = await Order.findOneAndUpdate(
            { id },
            payload,
            { new: true, runValidators: true })

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

        const result = await Order.findOneAndDelete({ id });

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