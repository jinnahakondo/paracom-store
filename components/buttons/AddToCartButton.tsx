"use client"
import React from 'react'
import { Button } from '../ui/button'
import { ShoppingCart } from 'lucide-react'
import { toast } from 'sonner'
import { useCartStore } from '@/store/useCartStore'
import { CategoryType, ProductType } from '@/types/types'


interface Props {
    product: ProductType<CategoryType>,
}


export default function AddToCartButton({ product }: Props) {

    const cartItem = {
        _id: String(product?._id),
        title: String(product?.title),
        image: String(product?.images[0]),
        price: Number(product?.price),
        quantity: 1
    }


    const addToCart = useCartStore(state => state.addToCart)


    return (
        <Button
            onClick={() => {
                addToCart({ product: cartItem })
                toast.success("Product added to cart")
            }}
            size="lg" className={` cursor-pointer`}>
            <ShoppingCart className="h-4 w-4 flex justify-center items-center gap-1" /> <span>Add to Cart</span>
        </Button>
    )
}
