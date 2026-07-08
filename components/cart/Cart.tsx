"use client"
import { BsCartX } from "react-icons/bs";

import { Drawer, DrawerContent, DrawerDescription, DrawerHeader, DrawerTitle, DrawerTrigger } from '../ui/drawer'
import CartButton from '../buttons/CartButton';
import { useQuery } from "@tanstack/react-query";
import axiosInstance from "@/lib/axiosInstance";
import { CartItem } from "./CartItem";
import { CartItemType, ProductType } from "@/types/types";

const getCartData = async () => {
    const res = await axiosInstance.get("/api/cart")
    return res.data
}

export default function Cart() {
    const { data, isLoading } = useQuery({
        queryKey: ["cart-data"],
        queryFn: getCartData
    })

    const items = data?.data?.items || [];
    console.log("items", items);

    return (
        <Drawer direction='right'>
            <DrawerTrigger>
                <CartButton />
            </DrawerTrigger>
            <DrawerContent className='px-4 py-3'>
                <DrawerHeader className='border-b-2 border-border '>
                    <DrawerTitle className=' uppercase'>
                        Your Cart
                    </DrawerTitle>
                    <DrawerDescription>
                        Review your selected items below.
                    </DrawerDescription>
                </DrawerHeader>
                {/* empty cart  */}
                {
                    items.length === 0 &&
                    <div className='h-[calc(100vh-64px)] grid place-items-center justify-center'>
                        <div className='flex flex-col items-center gap-2'>
                            <BsCartX size={72} />
                            Your shopping cart is empty
                        </div>
                    </div>
                }
                {/* loading cart data */}
                {
                    isLoading ? "loaidng..."
                        :
                        <div className="space-y-4 mt-4">
                            {items.map((item: CartItemType<ProductType>) => <CartItem
                                key={item.product._id}
                                item={item}
                            />)}
                        </div>
                }
            </DrawerContent>
        </Drawer>
    )
}
