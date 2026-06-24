import { Slider } from "@/components/ui/slider"


interface Props {
    priceRange: number[]
    setPriceRange: (value: number[]) => void
    onPriceFilter: () => void
}

export default function FilterPriceRange({
    priceRange,
    setPriceRange,
    onPriceFilter
}: Props
) {

    return (
        <div
            onPointerUp={onPriceFilter}
            className="pt-2 cursor-pointer">
            <Slider
                value={priceRange}
                max={2000}
                min={50}
                step={10}
                onValueChange={setPriceRange}
            />
            <div className="flex justify-between items-center text-sm font-medium text-foreground pt-1">
                <span>${priceRange[0]}</span>
                <span>${priceRange[1]}</span>
            </div>
        </div>
    )
}
