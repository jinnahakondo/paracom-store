import { Skeleton } from "@/components/ui/skeleton" // Adjust path based on your Shadcn setup

export default function SidebarFiltersSkeleton() {
    return (
        <aside className="w-full lg:max-w-[256px] flex flex-col bg-background text-foreground select-none">
            {/* CATEGORY SKELETON */}
            <div className="flex flex-col gap-3">
                {/* Header Title Placeholder */}
                <Skeleton className="h-4 w-24" />
                <div className="flex flex-col gap-2.5 pt-1">
                    {/* Fake Category Items with staggered widths for an organic feel */}
                    <Skeleton className="h-5 w-full" />
                    <Skeleton className="h-5 w-[90%]" />
                    <Skeleton className="h-5 w-[85%]" />
                    <Skeleton className="h-5 w-[95%]" />
                    <Skeleton className="h-5 w-[70%]" />
                </div>
            </div>

            {/* Pink Spacing Block (Uniform Gap) */}
            <div className="h-8" aria-hidden="true" />

            {/* PRICE RANGE SKELETON */}
            <div className="flex flex-col gap-3">
                {/* Header Title Placeholder */}
                <Skeleton className="h-4 w-28" />
                <div className="pt-3 pb-2">
                    {/* Slider Track Placeholder */}
                    <Skeleton className="h-2 w-full rounded-full" />
                </div>
                <div className="flex justify-between items-center">
                    {/* Min/Max Text Placeholders */}
                    <Skeleton className="h-4 w-8" />
                    <Skeleton className="h-4 w-12" />
                </div>
            </div>

            {/* Figma Pink Spacing Block (Uniform Gap) */}
            <div className="h-8" aria-hidden="true" />
        </aside>
    )
}