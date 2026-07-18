"use client"
import { BsCartX } from "react-icons/bs";

import { Drawer, DrawerClose, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle, DrawerTrigger } from '../ui/drawer'
import CartButton from '../buttons/CartButton';
import { CartItem } from "./CartItem";
import { Button } from "../ui/button";
import { useCartStore } from "@/store/useCartStore";
import { useRouter } from "next/navigation";
import { CartItemType } from "@/types/types";
import { FaBangladeshiTakaSign } from "react-icons/fa6";


export default function Cart() {

    const cart = useCartStore(state => state.cartItems);
    const totalPrice = cart.reduce((total, item) => {
        return total + (Number(item.price) * Number(item.quantity))
    }, 0)

    const router = useRouter()

    return (
        <Drawer direction='right'>
            <DrawerTrigger>
                <CartButton totalItems={cart.length} />
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
                    cart.length === 0 &&
                    <div className='h-[calc(100vh-64px)] grid place-items-center justify-center'>
                        <div className='flex flex-col items-center gap-2'>
                            <BsCartX size={72} />
                            Your shopping cart is empty
                        </div>
                    </div>
                }
                {/* cart data */}

                <div className="space-y-4 mt-4 overflow-y-auto">
                    {cart.map((item: CartItemType) => <CartItem
                        key={item._id}
                        item={item}
                    />)}
                </div>


                <DrawerFooter className="bg-accent">

                    <div className="flex items-center justify-between">
                        <h3 className="font-medium">Total:</h3>
                        <p className="flex items-center font-bold"> <FaBangladeshiTakaSign /> {totalPrice}</p>
                    </div>

                    {
                        cart.length > 0
                        &&
                        <DrawerClose asChild>
                            <Button
                                onClick={() => {
                                    router.push('/checkout')
                                }}
                                className="cursor-pointer">
                                Checkout
                            </Button>
                        </DrawerClose>
                    }

                </DrawerFooter>

            </DrawerContent>
        </Drawer>
    )
}
