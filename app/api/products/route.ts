import { connectDb } from "@/lib/db/db";
import { response } from "@/lib/helperFunction";
import Category from "@/schemas/category.schema";
import Product from "@/schemas/product.schema";
import { NextRequest } from "next/server";


export async function GET(req: NextRequest) {
    try {
        await connectDb()

        const searchParams = req.nextUrl.searchParams

        const search = searchParams.get('search');
        const slug = searchParams.get('category')
        const maxPrice = searchParams.get("max_price")
        const minPrice = searchParams.get("min_price")

        const query: Record<string, unknown> = {}
        if (search) query.title = { $regex: search, $options: "i" }

        const min = minPrice ? Number(minPrice) : NaN;
        const max = maxPrice ? Number(maxPrice) : NaN;

        if (!isNaN(min) || !isNaN(max)) {
            query.price = {
                ...(!isNaN(min) && { $gte: min }),
                ...(!isNaN(max) && { $lte: max }),
            };
        }

        if (slug) {
            const category = await Category.findOne({ slug });
            if (!category) {
                return response.error({
                    message: "Category not found",
                    status: 404
                });
            }
            query.category = category._id;
        }

        const products = await Product.find(query).populate('category')

        return response.success({
            data: products,
            message: "Product fetched successfully"
        })

    } catch (error: any) {
        return response.error(
            {
                message: "failed to fetch products",
                error: error.message,
            }
        )
    }
}

