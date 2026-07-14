"use client"

import Image from "next/image";
import { Trash2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CartItem, useCartStore } from "@/store/useCartStore";


export default function OrderReviewCard() {

    const formatBDT = (amount: number) => {
        return new Intl.NumberFormat("en-BD", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
        }).format(amount) + " ৳";
    };

    const cartItems = useCartStore(state => state.cartItems)
    const checkoutItem = useCartStore(state => state.checkOutItem)
    const updateQuantity = useCartStore(state => state.updateQuantity)



    const cart: CartItem[] = checkoutItem ? [checkoutItem] : cartItems

    return (
        <Card className="w-full bg-card text-card-foreground border border-border shadow-sm">
            <CardContent>
                {/* Header Title Accent */}
                <div className="flex items-center gap-3">
                    <div className="w-1 h-6 bg-primary rounded-full" />
                    <h2 className="text-xl font-bold tracking-tight">Order Review</h2>
                </div>

                {/* Product Items List */}
                <div className="space-y-4">
                    {cart.map((item) => (
                        <div
                            key={item._id}
                            className={`flex items-center justify-between rounded-xl transition-all border border-transparent bg-transparent`}
                        >
                            {/* Product Info & Thumbnail */}
                            <div className="flex items-center gap-4">
                                <div className="relative w-20 h-20 rounded-xl overflow-hidden border border-border bg-muted shrink-0">
                                    <Image
                                        src={item.image}
                                        alt={item.title}
                                        fill
                                        className="object-cover p-1"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <div className="flex items-center gap-2">
                                        <h3 className="font-bold text-sm md:text-base tracking-tight">
                                            {item.title}
                                        </h3>

                                    </div>

                                    {/* Quantity Actions */}

                                    <div className="inline-flex items-center border border-border/80 bg-muted/40 rounded-lg p-0.5">
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            className="h-7 w-7 rounded-md font-semibold text-muted-foreground hover:bg-background"
                                            onClick={() => updateQuantity({
                                                productId: item._id, type: "DECREMENT"
                                            })}
                                        >
                                            -
                                        </Button>
                                        <span className="w-8 text-center text-sm font-semibold text-foreground">
                                            {item.quantity}
                                        </span>
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            className="h-7 w-7 rounded-md font-semibold text-muted-foreground hover:bg-background"
                                            onClick={() => updateQuantity({
                                                productId: item._id, type: "INCREMENT"
                                            })}
                                        >
                                            +
                                        </Button>
                                    </div>

                                </div>
                            </div>

                            {/* Price & Primary Action Buttons */}
                            <div className="text-right space-y-3">
                                <p
                                    className={`font-bold text-base md:text-lg tracking-tight text-foreground
                                        }`}
                                    style={{ fontFeatureSettings: '"tnum"' }} // Ensures uniform numeric width tabular-nums
                                >
                                    {formatBDT(item.price)}
                                </p>

                                <div className="flex justify-end">

                                    <Button
                                        variant="ghost"
                                        size="icon"

                                        className="h-8 w-8 text-destructive/70 hover:text-destructive hover:bg-destructive/10 rounded-md"
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </Button>

                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    );
}