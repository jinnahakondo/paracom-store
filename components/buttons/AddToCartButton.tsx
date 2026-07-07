"use client"
import React from 'react'
import { Button } from '../ui/button'
import { ShoppingCart } from 'lucide-react'
import { useMutation } from '@tanstack/react-query'
import { useSession } from 'next-auth/react'
import axiosInstance from '@/lib/axiosInstance'
import { useRouter } from 'next/navigation'

interface AddToCartPayload {
    userId: string;
    productId: string;
}

interface CartResponse {
    success: boolean;
    message: string;
}

interface Props {
    productId?: string,
}

export default function AddToCartButton({ productId }: Props) {

    const { data, status } = useSession()

    const router = useRouter()

    // const { mutateAsync: addToCart, isPending } = useMutation<
    //     CartResponse,
    //     Error,
    //     AddToCartPayload
    // >({
    //     mutationKey: ["add_product_to_cart"],
    //     mutationFn: async (payload) => {
    //         const res = await axiosInstance.post<CartResponse>("/api/cart", payload);
    //         return res.data;
    //     },
    //     onSuccess: (data) => {
    //         console.log("added product to cart", data);
    //     },
    //     onError: (error) => {
    //         console.log(error);
    //     }
    // });


    const payload = { user: String(data?.user.id), product: productId }

    console.log(payload);

    return (
        <Button
            onClick={() => {
                if (status === "loading") return
                if (status === "unauthenticated") {
                    return router.push('/login')
                }
                // addToCart(payload)
            }}
            // disabled={isPending}
            size="lg" className={` cursor-pointer`}>
            <ShoppingCart className="h-4 w-4 flex justify-center items-center gap-1" /> <span>Add to Cart</span>
        </Button>
    )
}
