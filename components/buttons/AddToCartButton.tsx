"use client"
import React from 'react'
import { Button } from '../ui/button'
import { ShoppingCart } from 'lucide-react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useSession } from 'next-auth/react'
import axiosInstance from '@/lib/axiosInstance'
import { usePathname, useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { addToCart } from '@/lib/fetchData'


interface Props {
    productId?: string,
}


export default function AddToCartButton({ productId }: Props) {

    const { status } = useSession()

    const pathName = usePathname()
    const router = useRouter()

    const queryClient = useQueryClient()

    const { mutate, isPending } = useMutation({
        mutationKey: ['add-to-cart', productId,],
        mutationFn: addToCart,
        onSuccess: () => {
            toast.success("Added to Cart!")
            queryClient.invalidateQueries({ queryKey: ['cart-data'] })
        },
        onError: (error) => {
            console.log(error);
        }
    })



    return (
        <Button
            onClick={() => {
                if (status === "loading") return
                if (status === "unauthenticated") {
                    return router.push(`/login?callbackUrl=${pathName}`)
                }
                mutate({ productId: String(productId) })
            }}
            disabled={isPending}
            size="lg" className={` cursor-pointer`}>
            <ShoppingCart className="h-4 w-4 flex justify-center items-center gap-1" /> <span>Add to Cart</span>
        </Button>
    )
}
