
import Shop from '@/components/shop/ShopProducts'
import ShopPageHeader from '@/components/shop/ShopPageHeader'
import SidebarFilters from '@/components/shop/sidebar/SidebarFilters'
import React from 'react'

export default function ShopPage() {
    return (
        <div>
            <ShopPageHeader />
            <main className='grid grid-cols-1 lg:grid-cols-[256px_1fr] gap-10'>
                <SidebarFilters />
                <Shop/>
            </main>
        </div>
    )
}
