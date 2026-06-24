"use client"

import axiosInstance from "@/lib/axiosInstance"
import { useQuery } from "@tanstack/react-query"
import FilterCategory from "./FilterCategory"
import { categoryType } from "@/types/category"
import SidebarFiltersSkeleton from "../../skeleton/SidebarFilterSkeleton"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { FieldGroup } from "../../ui/field"
import FilterPriceRange from "./FilterPriceRange"
import { useState } from "react"
import { Button } from "../../ui/button"


const getCategories = async (): Promise<categoryType[]> => {
    try {
        const res = await axiosInstance.get('/api/categories')
        return res.data.data
    } catch (error: any) {

        const errorMsg = error.response?.data?.message || error.message
        throw new Error(errorMsg)
    }
}

export default function SidebarFilters() {

    const router = useRouter()
    const pathname = usePathname()
    const searchParams = useSearchParams()

    const hasFilters = searchParams.toString().length > 0;

    const initialMin = Number(searchParams.get('price_min')) || 50
    const initialMax = Number(searchParams.get('price_max')) || 2000

    const [priceRange, setPriceRange] = useState<number[]>([initialMin, initialMax])

    const currentCategories = searchParams.getAll("category")

    const updateUrlParams = () => {
        const params = new URLSearchParams(searchParams.toString())

        params.set('price_min', priceRange[0].toString())
        params.set('price_max', priceRange[1].toString())

        router.push(`${pathname}?${params.toString()}`)
    }

    const handleFilterChange = (category: string) => {
        const params = new URLSearchParams(searchParams.toString())
        if (currentCategories.includes((category))) {
            params.delete("category")
            currentCategories
                .filter(c => c !== category)
                .forEach(c => params.append("category", c))

        } else {
            params.append("category", category)
        }
        router.push(`${pathname}?${params.toString()}`)
    }


    const { data: categories = [], error, isLoading } = useQuery<categoryType[]>({
        queryKey: ['filter-categories'],
        queryFn: getCategories
    })

    if (isLoading) return <SidebarFiltersSkeleton />

    if (error) return <div className="text-sm text-destructive">Error loading categories</div>

    return (
        <aside className="w-full lg:max-w-[256px] flex flex-col bg-background text-foreground select-none">

            {
                hasFilters && <Button
                    className="mb-2"
                    onClick={() => {
                        setPriceRange([50, 2000])
                        router.push(pathname)
                    }}
                    variant={"destructive"}>Clear All Filters</Button>
            }

            {/* SECTION: CATEGORY */}
            <div className="flex flex-col gap-3">
                <h3 className="text-sm font-bold tracking-wider uppercase text-foreground">
                    Category
                </h3>
                <FieldGroup className="flex flex-col gap-2.5">
                    {categories.map((category) => (
                        <FilterCategory
                            key={category.slug}
                            {...category}
                            onFilterChange={handleFilterChange}
                            isChecked={currentCategories.includes(category.slug)}
                        />
                    ))}
                </FieldGroup>
            </div>

            <div className="h-8" aria-hidden="true" />

            {/* SECTION: PRICE RANGE */}
            <div className="flex flex-col gap-3">
                <h3 className="text-sm font-bold tracking-wider uppercase text-foreground">
                    Price Range
                </h3>
                <FilterPriceRange
                    priceRange={priceRange}
                    setPriceRange={setPriceRange}
                    onPriceFilter={updateUrlParams}
                />
            </div>
            <div className="h-8" aria-hidden="true" />

        </aside>
    )
}