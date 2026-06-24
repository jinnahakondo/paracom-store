import React from 'react'
import { SortProduct } from './SortProduct'

export default function ShopHeader() {
    return (
        <div className='flex justify-between items-center'>
            <h3 className='text-sm font-bold'>42 product found</h3>
            <div className='flex items-center gap-4'>
                <span className='text-xs font-medium text-muted-foreground whitespace-nowrap'>Sort by:</span>
                <SortProduct />
            </div>
        </div>
    )
}
