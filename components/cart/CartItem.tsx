"use client";

import Image from "next/image";
import { Minus, Plus, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CartItemType, ProductType } from "@/types/types";

interface CartItemProps {
    item: CartItemType<ProductType>
}

export function CartItem({ item }: CartItemProps) {
    const totalPrice = item.product.price * item.quantity;

    return (
        <div className="flex items-center gap-4 rounded-xl border bg-card p-2 shadow-sm max-w-md w-full relative group">
            {/* Product Image Wrapper */}
            <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-lg border bg-muted p-1">
                <Image
                    src={item.product.images[0]}
                    alt={item.product.title}
                    fill
                    className="object-contain"
                    sizes="56px"
                />
            </div>

            {/* Content Area */}
            <div className="flex flex-col flex-1 min-w-0 gap-1.5">
                <h4 className="text-sm font-medium text-card-foreground truncate pr-4">
                    {item.product.title}
                </h4>

                {/* Pricing and Quantity Control */}
                <div className="flex items-center gap-1.5 text-sm text-muted-foreground mt-0.5">
                    {/* Quantity Counter */}
                    <div className="flex items-center border border-input rounded-full bg-background h-7 overflow-hidden">
                        <Button
                            variant="ghost"
                            size="icon"
                            className="h-full w-6 rounded-none text-muted-foreground hover:bg-muted"

                        >
                            <Minus className="h-3 w-3" />
                        </Button>
                        <span className="w-6 text-center text-xs font-medium text-foreground">
                            {item.quantity}
                        </span>
                        <Button
                            variant="ghost"
                            size="icon"
                            className="h-full w-6 rounded-none text-muted-foreground hover:bg-muted"
                        >
                            <Plus className="h-3 w-3" />
                        </Button>
                    </div>

                    {/* Math Layout */}
                    <span className="">×</span>
                    <span className="font-medium text-foreground">৳{item.product.price.toFixed(2)}</span>
                    <span className="text-xs">=</span>
                    <span className="font-semibold text-foreground">৳{totalPrice.toFixed(2)}</span>
                </div>
            </div>

            {/* Remove Button */}
            <Button
                variant="ghost"
                size="icon"
                className=" h-8 w-8 rounded-full text-muted-foreground hover:text-destructive hover:bg-destructive/10"
            >
                <X className="h-4 w-4" />
            </Button>
        </div>
    );
}