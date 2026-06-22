import ProductCard from '@/components/ProductCard';
import Title from '@/components/shared/SectionTitle';
import { Product } from '@/types/Product'
import React from 'react'
interface ApiResponse {
    data: Product[];
}

export default async function FashionSection() {
    const res = await fetch(`${process.env.BASE_URL}/api/products?category=apparel-03f9&&limit=4`)

    if (!res.ok) {
        throw new Error("failed to fetch data")
    }

    const { data: fashionProduct }: ApiResponse = await res.json()


    return (
        <div>
            <Title>Fashion</Title>
            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
                {
                    fashionProduct.map(product => <ProductCard key={product._id} product={product} />
                    )
                }
            </div>
        </div>
    )
}
