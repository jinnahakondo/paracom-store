import ProductCard from '@/components/ProductCard';
import Title from '@/components/shared/SectionTitle';
import { ProductType } from '@/types/Product'
import React, { ReactNode } from 'react'
interface ApiResponse {
    data: ProductType[];
}

export default async function CategoryWiseProducts(
    {
        children,
        categorySlug }: {
            children: ReactNode,
            categorySlug: string
        }) {

    const res = await fetch(`${process.env.BASE_URL}/api/products?category=${categorySlug}&limit=4`,
        { next: { tags: ['category-products'] } }
    )

    if (!res.ok) {
        throw new Error("failed to fetch data")
    }

    const { data: categoryWiseProducts }: ApiResponse = await res.json()

    if (categoryWiseProducts.length === 0) {
        return <div className='grid place-items-center'>No products found!</div>
    }

    return (
        <div>
            <Title>{children}</Title>
            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
                {
                    categoryWiseProducts?.map(product => <ProductCard key={product._id} product={product} />
                    )
                }
            </div>
        </div>
    )
}
