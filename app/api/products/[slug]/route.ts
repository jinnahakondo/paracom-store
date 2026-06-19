import { connectDb } from "@/lib/db/db";
import { response } from "@/lib/helperFunction";
import Product from "@/schemas/product.schema";
import { NextRequest } from "next/server";
import slugify from "slugify"
import crypto from "crypto"
import { verifyRole } from "@/lib/auth/verifyAuth";

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

export async function PATCH(req: NextRequest, { params }: IParams) {
    try {
        await connectDb()
        await verifyRole("admin")

        const { slug } = await params

        const payload = await req.json()

        if (payload.title) {
            const baseSlug = slugify(payload.title, {
                lower: true,
                strict: true,
                trim: true
            })

            const uniqueId = crypto.randomBytes(2).toString('hex');
            payload.title = `${baseSlug}-${uniqueId}`
        }

        const result = await Product.findOneAndUpdate(
            { slug },
            payload,
            { new: true, runValidators: true })

        if (!result) {
            return response.error({
                message: "Product not found",
                status: 404
            })
        }

        return response.success({
            message: "Product updated successfully",
            data: result
        })

    } catch (error: any) {
        return response.error({
            message: 'Failed to update product',
            error: error.message
        })
    }
}

export async function DELETE(req: NextRequest, { params }: IParams) {
    try {
        await connectDb()
        await verifyRole('admin')

        const { slug } = await params;

        const result = await Product.findOneAndDelete({ slug });

        if (!result) {
            return response.error({
                message: "Product not found",
                status: 404,
            });
        }

        return response.success({
            message: "Product deleted successfull"
        })

    } catch (error: any) {
        return response.error({
            message: "Failed to delete product",
            error: error.message
        })
    }
}