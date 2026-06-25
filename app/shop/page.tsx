
import DynamicBreadcrumb, { BreadcrumbItemProps } from '@/components/shared/DynamicBreadcrumb'
import Shop from '@/components/shop/ShopProducts'
import SidebarFilters from '@/components/shop/sidebar/SidebarFilters'
import React, { Suspense } from 'react'

export default async function ShopPage({
    searchParams,
}: {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
    const params = await searchParams
    const sort = params.sort_by || ''
    const category = params.category || ''
    const min_price = params.min_price || ''
    const max_price = params.max_price || ''

    const urlParams = new URLSearchParams();

    if (sort) urlParams.append("sort_by", String(sort));
    if (min_price) urlParams.append("min_price", String(min_price));
    if (max_price) urlParams.append("max_price", String(max_price));

    if (category) {
        if (Array.isArray(category)) {
            category.forEach(c => urlParams.append("category", c))
        } else {
            urlParams.append("category", category)
        }
    }

    const res = await fetch(`${process.env.BASE_URL}/api/products?${urlParams.toString()}`)

    if (!res.ok) {
        throw new Error("failed to fetch data")
    }
    const { data: products, total } = await res.json()

    const breadcrumbItems: BreadcrumbItemProps[] = [
        { label: "Home", href: "/" },
        { label: "Shop" },
    ]

    const limit = 12
    const page = Math.ceil(total / limit)


    return (
        <div>
            <div className='sticky top-22'>
                <DynamicBreadcrumb items={breadcrumbItems} />
            </div>
            <main className='grid grid-cols-1 lg:grid-cols-[256px_1fr] gap-10 py-16 items-start'>
                <div className='sticky top-36 h-fit'>
                    <SidebarFilters />
                </div>
                {/* <Suspense fallback={'loading...'}> */}
                <Shop products={products} total={total} />
                {/* </Suspense> */}
            </main>
            <div className='flex items-center justify-center mb-8'>  hello</div>
        </div>
    )
}
