import { ShoppingCart } from 'lucide-react'
import React from 'react'

export default function CartButton() {
    return (
        <div className='relative p-2 hover:text-primary transition-colors rounded-full hover:bg-muted/50'>

            <ShoppingCart className='h-5 w-5 stroke-[1.5]' />

            {/* Blue notification dot */}
            <span className='absolute top-1.5 right-1.5 bg-primary h-3 w-3 rounded-full ring-2 ring-background text-accent text-[8px] grid place-items-center'>
                0
            </span>
        </div>
    )
}
