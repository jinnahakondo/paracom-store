"use client";

import Image from "next/image";
import { Minus, Plus, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/store/useCartStore";
import { useSession } from "next-auth/react";
import { CartItemType } from "@/types/types";
import { Checkbox } from "../ui/checkbox";
import { useState } from "react";

interface ItemType {
    item: CartItemType
}


export function CartItem({ item }: ItemType) {


    const { status } = useSession()

    const removeCartItem = useCartStore(state => state.removeCartItem);
    const updateQuantity = useCartStore(state => state.updateQuantity);
    const toggleSelectItem = useCartStore(state => state.toggleSelect);

    const totalPrice = Math.round(item.price * item.quantity)

    return (
        <div className="flex items-center gap-4 rounded-xl border bg-card p-2 shadow-sm max-w-md w-full relative group">
            {/* checkbox  */}
            <Checkbox
                checked={item.isSelected}
                onCheckedChange={
                    () => toggleSelectItem(item.productId)
                } />

            {/* Product Image Wrapper */}
            <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-lg border bg-muted p-1">
                <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-contain"
                    sizes="56px"
                />
            </div>

            {/* Content Area */}
            <div className="flex flex-col flex-1 min-w-0 gap-1.5">
                <h4 className="text-sm font-medium text-card-foreground truncate pr-4">
                    {item.title}
                </h4>

                {/* Pricing and Quantity Control */}
                <div className="flex items-center gap-1.5 text-sm text-muted-foreground mt-0.5 w-fit">
                    {/* Quantity Counter */}
                    <div className="flex items-center border border-input rounded-full bg-background h-7 overflow-hidden">
                        <Button
                            onClick={() => updateQuantity(
                                {
                                    productId: String(item?.productId),
                                    status: status === 'authenticated',
                                    type: "DECREMENT"
                                }
                            )}
                            disabled={item.quantity === 1}
                            variant="ghost"
                            size="icon"
                            className="h-full w-6 rounded-none text-muted-foreground hover:bg-muted"

                        >
                            <Minus size={12} />
                        </Button>
                        <span className="w-6 text-center text-xs font-medium text-foreground">
                            {item.quantity}
                        </span>
                        <Button
                            onClick={() => updateQuantity(
                                {
                                    productId: String(item?.productId),
                                    status: status === 'authenticated',
                                    type: "INCREMENT"
                                }
                            )}
                            variant="ghost"
                            size="icon"
                            className="h-full w-6 rounded-none text-muted-foreground hover:bg-muted"
                        >
                            <Plus size={12} />
                        </Button>
                    </div>

                    {/* Math Layout */}
                    <span className="">×</span>
                    <span className="font-medium text-foreground">৳{item.price}</span>
                    <span className="text-xs">=</span>
                    <span className="font-semibold text-foreground">৳{totalPrice}</span>
                </div>
            </div>

            {/* Remove Button */}
            <Button
                onClick={() => removeCartItem(
                    {
                        status: status === 'authenticated',
                        productId: String(item?.productId)
                    }
                )}
                variant="ghost"
                size="icon"
                className=" h-8 w-8 rounded-full text-muted-foreground hover:text-destructive hover:bg-destructive/10"
            >
                <X className="h-4 w-4" />
            </Button>
        </div>
    );
}