import { connectDb } from "@/lib/db/db";
import { response } from "@/lib/helperFunction";
import Product from "@/schemas/product.schema";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
    try {
        await connectDb();

        const { search } = await req.json()

        console.log({ search });

        const result = await Product.find({ title: { $regex: search, $options: "i" } })
            .populate('category', '-_id slug name')
            .select('-_id title images price slug category');


        return response.success({
            message: "search suggesion product get success",
            data: result
        })
    } catch (error: any) {
        return response.error({
            message: "failed to get procuct for search suggesion",
            error: error.message
        })
    }
}