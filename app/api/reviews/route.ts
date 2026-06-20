import { verifyAuth } from "@/lib/auth/verifyAuth"
import { connectDb } from "@/lib/db/db"
import { response } from "@/lib/helperFunction"
import Review from "@/schemas/review.schema"
import { NextRequest } from "next/server"

export async function GET() {
    try {
        await connectDb()
        await verifyAuth()

        const result = await Review.find().lean().exec()

        return response.success({
            data: result,
            message: "Reviews fetched successfully"
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
        const result = await Review.create(payload)

        return response.success({
            message: "Review created successfully",
            data: result
        })

    } catch (error: any) {
        return response.error({
            message: "Failed to  create review",
            error: error.message
        })
    }
}