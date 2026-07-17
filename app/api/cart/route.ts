import { verifyAuth } from "@/lib/auth/verifyAuth";
import { connectDb } from "@/lib/db/db";
import { response } from "@/lib/helperFunction";
import Cart from "@/schemas/cart.schema";
import "@/schemas/product.schema";
import { NextRequest } from "next/server";



export async function GET() {
    try {
        await connectDb();
        const { user } = await verifyAuth();

        const result = await Cart.find({ user: user.id })
            .populate("product", "title images price")
            .exec();

        const modifiedResult = result.map(item => (
            {
                _id: item?._id,
                title: item?.product?.title,
                image: item?.product?.images[0],
                price: item?.product?.price,
                quantity: item?.quantity,
            }
        ))

        return response.success({
            message: "cart data fetched",
            data: modifiedResult
        })

    } catch (error: any) {
        return response.error({
            message: "failed to fetch cart data",
            error: error.message
        })
    }
}