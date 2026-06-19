import { connectDb } from "@/lib/db/db";
import { response } from "@/lib/helperFunction";
import Product from "@/schemas/product.schema";
import { NextRequest } from "next/server";

interface IParams {
    params: Promise<{ slug: string }>
}

export async function GET(req: NextRequest, { params }: IParams) {
    try {
        await connectDb()

        const { slug } = await params

        const product = await Product.findOne({ slug })

        return response.success({
            message: "Product fetched successfull",
            data: product
        })
        
    } catch (error: any) {
        return response.error({
            message: "Failed to fetch product",
            error: error.message
        })
    }
}