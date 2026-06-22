import ProductCard from '@/components/ProductCard';
import Title from '@/components/shared/SectionTitle';
import { Product } from '@/types/Product'
import React from 'react'
interface ApiResponse {
    data: Product[];
}

export default async function GroceriesSection() {
    const res = await fetch(`${process.env.BASE_URL}/api/products?category=groceries-949e&&limit=4`)

    if (!res.ok) {
        throw new Error("failed to fetch data")
    }

    const { data: grocerieProduct }: ApiResponse = await res.json()


    return (
        <div>
            <Title>Groceries</Title>
            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
                {
                    grocerieProduct.map(product => <ProductCard key={product._id} product={product} />
                    )
                }
            </div>
        </div>
    )
}
