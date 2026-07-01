import React from 'react'
import Title from '../shared/SectionTitle'
import ProductCard from '../ProductCard'
import { ProductType } from '@/types/Product';

interface ApiResponse {
    data: ProductType[];
}


export default async function PopularSection() {
    const res = await fetch(`${process.env.BASE_URL}/api/products/popular`)

    if (!res.ok) {
        throw new Error("failed to fetch data")
    }

    const { data: popularProducts }: ApiResponse = await res.json()


    return (
        <div>
            <Title>Popular Products</Title>
            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
                {
                    popularProducts.map(product => <ProductCard key={product._id} product={product} />
                    )
                }
            </div>
        </div>
    )
}