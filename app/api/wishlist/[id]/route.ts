import { verifyAuth } from "@/lib/auth/verifyAuth"
import { connectDb } from "@/lib/db/db"
import { isValidId, response } from "@/lib/helperFunction"
import Wishlist from "@/schemas/wishlist.schema"
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

        const result = await Wishlist.findById(id).lean().exec()

        if (!result) {
            return response.error({
                message: "Wishlist not found",
                status: 404
            })
        }

        return response.success({
            message: "Wishlist fetched successfull",
            data: result
        })

    } catch (error: any) {
        return response.error({
            message: "Failed to fetch Wishlist",
            error: error.message
        })
    }
}


export async function DELETE(req: NextRequest, { params }: IParams) {
    try {
        await connectDb()
        await verifyAuth()

        const { id } = await params;

        if (!isValidId(id)) {
            return response.error({
                message: "invalid objectId",
                status: 400,
            });
        }

        const result = await Wishlist.findByIdAndDelete(id).exec();

        if (!result) {
            return response.error({
                message: "Wishlist not found",
                status: 404,
            });
        }

        return response.success({
            message: "Wishlist deleted successfull"
        })

    } catch (error: any) {
        return response.error({
            message: "Failed to delete wishlist",
            error: error.message
        })
    }
}