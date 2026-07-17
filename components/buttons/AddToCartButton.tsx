"use client"
import React from 'react'
import { Button } from '../ui/button'
import { ShoppingCart } from 'lucide-react'
import { toast } from 'sonner'
import { useCartStore } from '@/store/useCartStore'
import { CartItemType, CategoryType, ProductType } from '@/types/types'
import { useSession } from 'next-auth/react'


interface Props {
    product: ProductType<CategoryType>,
}


export default function AddToCartButton({ product }: Props) {

    const { status } = useSession()

    const addToCart = useCartStore(state => state.addToCart)

    const newCartItem: CartItemType = {
        _id: product._id,
        title: product.title,
        image: product.images[0],
        price: product.price,
        quantity: 1
    }

    return (
        <Button
            onClick={() => {
                addToCart(
                    {
                        newItem: newCartItem,
                        status: status === 'authenticated'
                    }
                )
                toast.success("Product added to cart")
            }}
            size="lg" className={` cursor-pointer`}>
            <ShoppingCart className="h-4 w-4 flex justify-center items-center gap-1" /> <span>Add to Cart</span>
        </Button>
    )
}
