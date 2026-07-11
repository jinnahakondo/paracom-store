import { verifyAuth } from "@/lib/auth/verifyAuth";
import { connectDb } from "@/lib/db/db";
import { response } from "@/lib/helperFunction";
import Cart from "@/schemas/cart.schema";
import "@/schemas/product.schema";
import { NextRequest } from "next/server";




export async function GET(req: NextRequest) {
    try {
        await connectDb();
        const { user } = await verifyAuth()

        const cart = await Cart.findOne({
            user: user.id,
        }).populate("items.product", "title images price");

        return response.success({
            message: "cart fetched",
            data: cart
        })

    } catch (error: any) {
        return response.error(
            {
                message: "Failed to fetch cart",
                error: error.message
            }
        )
    }
}

export async function POST(req: NextRequest) {
    try {
        await connectDb()
        const { user } = await verifyAuth()

        const { productId, quantity } = await req.json()

        let cart = await Cart.findOne({ user: user.id })

        if (!cart) {
            cart = await Cart.create(
                {
                    user: user.id,
                    items: [
                        {
                            product: productId
                        }
                    ]
                }
            )
            return response.success({
                message: "product added to cart",
                data: cart
            })
        }

        const existingItem = cart.items.find(
            (item: any) => item.product.toString() === productId
        );

        if (existingItem) {
            existingItem.quantity = quantity || existingItem.quantity + 1
        } else {
            cart.items.push({ product: productId, quantity: 1 })
        }

        await cart.save();

        return response.success({
            message: "product added to cart",
            data: cart
        })

    } catch (error: any) {
        return response.error(
            {
                message: "Failed to add product to cart",
                error: error.message
            }
        )
    }
}