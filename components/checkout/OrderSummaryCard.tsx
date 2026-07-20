"use client"
import React from "react";
import { Lock } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { FaBangladeshiTakaSign } from "react-icons/fa6";
import { useCartStore } from "@/store/useCartStore";
import { handleCheckout } from "@/lib/fetchData";


export default function OrderSummaryCard() {

    const deleveryFee = 50;
    const cartItems = useCartStore(state => state.cartItems);
    const totalPrice = cartItems.reduce((total, item) => {
        return total + (Number(item.price) * Number(item.quantity))
    }, 0)

    const onCheckout = async () => {
        try {
            const data = await handleCheckout(cartItems);

            if (data.url) {
                window.location.href = data.url;
            }
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <Card className="w-full bg-card text-card-foreground border border-border shadow-md">
            <CardContent className=" space-y-3">
                <h2 className="text-xl font-bold tracking-tight">Order Summary</h2>
                {/* Promo Code Section */}
                <div className="space-y-2">
                    <div className="flex gap-2">
                        <Input
                            type="text"
                            placeholder="Enter Store/Coupon Code"
                            value={''}
                            className="bg-background border-border text-sm h-11 focus-visible:ring-primary"
                        />
                        <Button
                            className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold px-6 h-11 rounded-md"
                        >
                            APPLY
                        </Button>
                    </div>
                </div>

                <Separator className="bg-border/60 my-2" />

                <Separator className="bg-border/60 my-2" />

                {/* Line Items Calculations */}
                <div className="space-y-4 text-sm md:text-base font-medium">
                    <div className="flex justify-between items-center">
                        <span className="text-muted-foreground">
                            Items Total ({cartItems.length} Items)
                        </span>
                        <span className="font-semibold flex items-center">
                            <FaBangladeshiTakaSign />
                            <span>{totalPrice}</span>
                        </span>
                    </div>

                    <div className="flex justify-between items-center">
                        <span className="text-muted-foreground">Delivery Fee</span>
                        <span className="font-semibold flex items-center">
                            <FaBangladeshiTakaSign />
                            <span> {deleveryFee}</span>
                        </span>
                    </div>

                </div>

                <Separator className="bg-border/60 my-2" />

                {/* Final Grand Total Display */}
                <div className="space-y-1">
                    <div className="flex items-baseline justify-between">
                        <span className="text-lg font-semibold">Total:</span>
                        <span className=" md:text-xl font-extrabold text-primary tracking-tight flex items-center">
                            <FaBangladeshiTakaSign />
                            <span>{totalPrice + deleveryFee}</span>
                        </span>
                    </div>

                </div>

                {/* Call To Action Buttons */}
                <div className="space-y-4 pt-2">
                    <Button
                        onClick={onCheckout}
                        variant={'default'}
                        size="lg"
                        className="w-full"
                    >
                        Proceed to Pay
                    </Button>

                    {/* Secure Checkout Footer info */}
                    <div className="flex items-center justify-center gap-2 text-xs font-medium text-muted-foreground/80">
                        <Lock className="w-3.5 h-3.5" />
                        <span>Secure Checkout Powered by AI</span>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}