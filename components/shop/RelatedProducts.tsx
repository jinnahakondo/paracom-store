import React from 'react'
import { CategoryType, ProductType } from '@/types/types';
import Title from '../shared/SectionTitle';
import ProductCard from '../ProductCard';


interface ApiResponse {
    data: ProductType<CategoryType>[];
}

interface Props {
    categoryId: string | CategoryType
}


export default async function RelatedProducts({ categoryId }: Props) {
    const url = `${process.env.BASE_URL}/api/related-products/${categoryId}`
    const res = await fetch(url)

    if (!res.ok) {
        throw new Error("failed to fetch data")
    }

    const { data: relatedProducts }: ApiResponse = await res.json()


    return (
        <div>
            <Title>Related Products</Title>
            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
                {
                    relatedProducts.map(product => <ProductCard key={product._id} product={product} />
                    )
                }
            </div>
        </div>
    )
}