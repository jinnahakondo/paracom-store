
import DynamicBreadcrumb, { BreadcrumbItemProps } from '@/components/shared/DynamicBreadcrumb'

import Shop from '@/components/shop/ShopProducts'
import SidebarFilters from '@/components/shop/sidebar/SidebarFilters'
import ProductCardSkeleton from '@/components/skeleton/ProductCardSekleton'
import React, { Suspense } from 'react'

export default async function ShopPage({
    searchParams,
}: {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
    const params = await searchParams

    const breadcrumbItems: BreadcrumbItemProps[] = [
        { label: "Home", href: "/" },
        { label: "Shop" },
    ]

    // loading skeleton for products 
    const loadingProducts = <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 pb-16 gap-6">
        {
            [...Array(9)].map((_, i) => <ProductCardSkeleton key={i} />)
        }
    </div>

    return (
        <div>
            <div className='sticky top-22'>
                <DynamicBreadcrumb items={breadcrumbItems} />
            </div>
            <main className='grid grid-cols-1 lg:grid-cols-[256px_1fr] gap-10 py-16 items-start'>
                <div className='sticky top-36 h-fit'>
                    <SidebarFilters />
                </div>
                <Suspense fallback={loadingProducts}>
                    <Shop params={params} />
                </Suspense>
            </main>
           
        </div>
    )
}
