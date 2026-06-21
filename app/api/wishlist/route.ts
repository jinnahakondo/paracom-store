import { verifyAuth } from "@/lib/auth/verifyAuth"
import { connectDb } from "@/lib/db/db"
import { response } from "@/lib/helperFunction"
import Wishlist from "@/schemas/wishlist.schema"
import { NextRequest } from "next/server"

export async function GET() {
    try {
        await connectDb()
        await verifyAuth()

        const result = await Wishlist.find().lean().exec()

        return response.success({
            data: result,
            message: "Wishlist fetched successfully"
        })

    } catch (error: any) {
        return response.error(
            {
                message: "Failed to fetch Wishlist",
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
        const result = await Wishlist.create(payload)

        return response.success({
            message: "Wishlist created successfully",
            data: result
        })

    } catch (error: any) {
        return response.error({
            message: "Failed to create wishlist",
            error: error.message
        })
    }
}