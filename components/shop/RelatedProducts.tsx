import React from 'react'
import { ProductType } from '@/types/Product';
import Title from '../shared/SectionTitle';
import ProductCard from '../ProductCard';
import { categoryType } from '@/types/category';

interface ApiResponse {
    data: ProductType[];
}

interface Props {
    categoryId: string | categoryType
}


export default async function RelatedProducts({ categoryId }: Props) {
    const url = `${process.env.BASE_URL}/api/related-products/${categoryId}`
    const res = await fetch(url)

    console.log(url);

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