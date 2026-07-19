import { connectDb } from "@/lib/db/db";
import { response } from "@/lib/helperFunction";
import Category from "@/schemas/category.schema";
import Product from "@/schemas/product.schema";
import { NextRequest } from "next/server";

interface IParams {
    params: Promise<{ categoryId: string }>
}

export async function GET(req: NextRequest, { params }: IParams) {
    try {
        await connectDb()
        const { categoryId } = await params

        const result = await Product.find({ category: categoryId })
            .limit(4)
            .lean()
            .exec()

        return response.success({
            message: "Related product fetched",
            data: result
        })
    } catch (error: any) {
        return response.error({
            message: "failed to fetch related products",
            error: error.message
        })
    }
}