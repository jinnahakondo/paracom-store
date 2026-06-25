import React from 'react'
import ShopHeader from './ShopHeader'
import ProductCard from '../ProductCard'
import { Product } from '@/types/Product'
import Pagination from './Pagination'

interface Props {
  params: {
    [key: string]: string | string[] | undefined;
  }
}

const limit = 9

export default async function Shop({ params }: Props) {

  const sort = params.sort_by || ''
  const category = params.category || ''
  const min_price = params.min_price || ''
  const max_price = params.max_price || ''
  const page = params.page || 1

  const urlParams = new URLSearchParams();

  if (sort) urlParams.append("sort_by", String(sort));
  if (min_price) urlParams.append("min_price", String(min_price));
  if (max_price) urlParams.append("max_price", String(max_price));
  if (page) urlParams.append("page", String(page))

  if (category) {
    if (Array.isArray(category)) {
      category.forEach(c => urlParams.append("category", c))
    } else {
      urlParams.append("category", category)
    }
  }

  urlParams.append("limit", String(limit))


  const res = await fetch(`${process.env.BASE_URL}/api/products?${urlParams.toString()}`)

  if (!res.ok) {
    throw new Error("failed to fetch data")
  }
  const { data: products, total } = await res.json()


  const totalPage = Math.ceil(total / limit)

  return (
    <div>
      <ShopHeader totalProducts={String(total)} />
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6'>
        {
          products.map((product: Product) => <ProductCard key={product._id} product={product} />)
        }
      </div>
      <div className='flex items-center justify-center mt-8'>
        <Pagination totalPage={totalPage} />
      </div>
    </div>
  )
}
