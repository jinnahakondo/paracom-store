import React from "react";
import Image from "next/image";
import Link from "next/link";
import { SearchSuggestionItemType } from "@/types/types";



export const SearchSuggestionItem = ({
    title,
    images,
    price,
    category,
    slug,
}: SearchSuggestionItemType) => {
    return (
        <Link
            href={`/shop/${slug}`}
            className="flex items-center gap-4 rounded-md p-2 transition-colors duration-200 outline-none hover:bg-accent hover:text-accent-foreground focus-visible:bg-accent focus-visible:text-accent-foreground group"
        >
            {/* Image Container */}
            <div className="relative aspect-square h-12 w-12 shrink-0 overflow-hidden rounded-md border border-border bg-muted">
                <Image
                    src={images[0]}
                    alt={title}
                    fill
                    sizes="48px"
                    className="object-cover object-center transition-transform duration-300 group-hover:scale-105"
                />
            </div>

            {/* Product Information */}
            <div className="flex flex-col flex-1 min-w-0 justify-center gap-1">
                {/* Pricing Tag */}
                <div className="shrink-0 text-sm font-semibold text-foreground flex items-center gap-0.5">
                    {price.toFixed(2)} <span className="font-medium">টাকা</span>
                </div>
                <h4 className="text-sm font-medium leading-none text-foreground truncate group-hover:text-accent-foreground">
                    {title}
                </h4>
            </div>


        </Link>
    );
};