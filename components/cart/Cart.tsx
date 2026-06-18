
import { BsCartX } from "react-icons/bs";

import { Drawer, DrawerContent, DrawerDescription, DrawerHeader, DrawerTitle, DrawerTrigger } from '../ui/drawer'
import CartButton from '../buttons/CartButton';

export default function Cart() {
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
                <div className='h-[calc(100vh-64px)] grid place-items-center justify-center'>
                    <div className='flex flex-col items-center gap-2'>
                        <BsCartX size={72} />
                        Your shopping cart is empty
                    </div>
                </div>
            </DrawerContent>
        </Drawer>
    )
}
