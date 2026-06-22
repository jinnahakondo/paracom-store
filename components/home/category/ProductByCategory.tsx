import ProductCard from '@/components/ProductCard';
import Title from '@/components/shared/SectionTitle';
import { Product } from '@/types/Product'
import React, { ReactNode } from 'react'
interface ApiResponse {
    data: Product[];
}

export default async function ProductByCategory(
    {
        children,
        categorySlug }: {
            children: ReactNode,
            categorySlug: string
        }) {

    const res = await fetch(`${process.env.BASE_URL}/api/products?category=${categorySlug}&limit=4`)

    if (!res.ok) {
        throw new Error("failed to fetch data")
    }

    const { data: productByCategory }: ApiResponse = await res.json()


    return (
        <div>
            <Title>{children}</Title>
            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
                {
                    productByCategory?.map(product => <ProductCard key={product._id} product={product} />
                    )
                }
            </div>
        </div>
    )
}
