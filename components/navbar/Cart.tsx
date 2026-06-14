import { ShoppingCart } from 'lucide-react'
import React from 'react'

export default function Cart() {
    return (
        <div>
            {/* Cart Button with Notification Dot */}
            <button className='relative p-2 hover:text-primary transition-colors rounded-full hover:bg-muted/50'>
                <ShoppingCart className='h-5 w-5 stroke-[1.5]' />
                {/* Blue notification dot from image_384306.png */}
                <span className='absolute top-1.5 right-1.5 h-2 w-2 bg-indigo-600 rounded-full ring-2 ring-background' />
            </button>
        </div>
    )
}
