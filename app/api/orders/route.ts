import { verifyAuth, verifyRole } from "@/lib/auth/verifyAuth";
import { connectDb } from "@/lib/db/db";
import { response } from "@/lib/helperFunction";
import Order from "@/schemas/order.schema";
import { NextRequest } from "next/server";

export async function GET() {
    try {
        await connectDb()
        await verifyRole("admin")

        const result = await Order.find().lean().exec()

        return response.success({
            data: result,
            message: result.length === 0 ? "Order not found" : "Order fetched successfully"
        })

    } catch (error: any) {
        return response.error(
            {
                message: "Failed to fetch orders",
                error: error.message,
            }
        )
    }
}

export async function POST(req: NextRequest) {
    try {
        await connectDb()
        await verifyAuth()

        const payload = await req.json()
        const result = await Order.create(payload)

        return response.success({
            message: "Order placed successfully",
            data: result
        })

    } catch (error: any) {
        return response.error({
            message: "Failed to place product",
            error: error.message
        })
    }
}