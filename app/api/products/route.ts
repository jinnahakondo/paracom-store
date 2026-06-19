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

        const slug = searchParams.getAll('category')

        const maxPrice = searchParams.get("max_price")
        const minPrice = searchParams.get("min_price")

        const sort = searchParams.get("sort_by")

        const sortOption: Record<string, 1 | -1> = {};

        if (sort === "rating") {
            sortOption.averageRating = -1
        } else if (sort === "price_low_to_high") {
            sortOption.price = 1
        } else if (sort === "price_high_to_low") {
            sortOption.price = -1
        }



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

        if (slug && slug.length > 0) {
            const category = await Category.find({ slug: { $in: slug } });
            if (category.length === 0) {
                return response.error({
                    message: `${slug.length === 1 ? "Category" : "Categories"} not found`,
                    status: 404
                });
            }

            const categoryIds = category.map(cat => cat._id)

            query.category = { $in: categoryIds };
        }

        const products = await Product.find(query)
            .populate('category')
            .sort(sortOption)

        return response.success({
            data: products,
            message: products.length === 0 ? "Product not found" : "Product fetched successfully"
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

