import { connectDb } from "@/lib/db/db";
import { generateSlug, response } from "@/lib/helperFunction";
import { NextRequest } from "next/server";
import { verifyRole } from "@/lib/auth/verifyAuth";
import Category from "@/schemas/category.schema";

interface IParams {
    params: Promise<{ slug: string }>
}

export async function GET(req: NextRequest, { params }: IParams) {
    try {
        await connectDb()
        await verifyRole("admin")

        const { slug } = await params

        const result = await Category.findOne({ slug }).lean().exec()

        if (!result) {
            return response.error({
                message: "Category not found",
                status: 404
            })
        }

        return response.success({
            message: "Category fetched successfull",
            data: result
        })

    } catch (error: any) {
        return response.error({
            message: "Failed to fetch category",
            error: error.message
        })
    }
}

export async function PATCH(req: NextRequest, { params }: IParams) {
    try {
        await connectDb()
        await verifyRole("admin")

        const { slug } = await params

        const payload = await req.json()

        if (payload.title) {

            payload.slug = generateSlug(payload.title)
        }

        const result = await Category.findOneAndUpdate(
            { slug },
            payload,
            { new: true, runValidators: true })

        if (!result) {
            return response.error({
                message: "Category not found",
                status: 404
            })
        }

        return response.success({
            message: "Category updated successfully",
            data: result
        })

    } catch (error: any) {
        return response.error({
            message: 'Failed to update category',
            error: error.message
        })
    }
}

export async function DELETE(req: NextRequest, { params }: IParams) {
    try {
        await connectDb()
        await verifyRole('admin')

        const { slug } = await params;

        const result = await Category.findOneAndDelete({ slug });

        if (!result) {
            return response.error({
                message: "Category not found",
                status: 404,
            });
        }

        return response.success({
            message: "Category deleted successfull"
        })

    } catch (error: any) {
        return response.error({
            message: "Failed to delete category",
            error: error.message
        })
    }
}