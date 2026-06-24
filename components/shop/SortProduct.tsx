"use client"
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { usePathname, useRouter, useSearchParams } from "next/navigation"

export function SortProduct() {
    const router = useRouter()
    const searchParams = useSearchParams()
    const pathName =usePathname()

    const onSort = (value: string) => {
        const params = new URLSearchParams(searchParams.toString())
        params.set("sort_by", value)
        router.push(`${pathName}?${params}`)
    }

    const sortOptions = [
        { label: "Rating", value: "rating" },
        { label: "Price high to low", value: "price_high_to_low" },
        { label: "Price low to high", value: "price_low_to_high" },
    ]
    return (
        <Select
            onValueChange={(val) => onSort(val)}
        >
            <SelectTrigger className="w-full max-w-48">
                <SelectValue placeholder="Default Sorting" />
            </SelectTrigger>
            <SelectContent position="popper">
                <SelectGroup>
                    <SelectLabel>Default Sorting</SelectLabel>
                    {
                        sortOptions.map(s => <SelectItem
                            key={s.value}
                            value={s.value}>
                            {s.label}
                        </SelectItem>)
                    }
                </SelectGroup>
            </SelectContent>
        </Select>
    )
}
