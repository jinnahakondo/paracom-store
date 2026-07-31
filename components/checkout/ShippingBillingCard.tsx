import React from "react";
import { MapPin } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useQuery } from "@tanstack/react-query";
import axiosInstance from "@/lib/axiosInstance";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

// Defined Interface matching your data contract
export interface Address {
    _id?: string;
    name: string;
    phone: string;
    division: string;
    district?: string;
    city?: string;
    postalCode?: number | string;
    address: string;
    isDefault?: boolean;
}

export default function ShippingBillingCard() {
    const { status } = useSession();
    const router = useRouter();

    const { data, isPending } = useQuery<{ data: Address }>({
        queryKey: ["shiping-address"],
        queryFn: async () => {
            const res = await axiosInstance.get("/api/save-address/default");
            return res.data;
        },
        enabled: status === "authenticated",
    });

    if (isPending) {
        return <div className="grid place-items-center">loading...</div>;
    }

    // Fallback check in case data or default address isn't set yet
    const address = data?.data;

    if (!address) {
        return (
            <Card className="w-full bg-card text-card-foreground shadow-sm">
                <CardContent className="p-6 flex justify-between items-center">
                    <p className="text-muted-foreground text-sm font-medium">
                        No default shipping address selected.
                    </p>
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => router.push("/dashboard/saved-addresses")}
                    >
                        Add Address
                    </Button>
                </CardContent>
            </Card>
        );
    }

    return (
        <Card className="w-full bg-card text-card-foreground shadow-sm">
            <CardContent className="space-y-6 pt-6">
                {/* Header Section */}
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        {/* Left indicator bar */}
                        <div className="w-1 h-6 bg-primary rounded-full" />
                        <h2 className="text-xl font-bold tracking-tight">
                            Shipping & Billing
                        </h2>
                    </div>
                    <Button
                        variant="ghost"
                        onClick={() => {
                            router.push("/dashboard/saved-addresses");
                        }}
                        className="text-primary hover:text-primary/90 font-semibold hover:bg-primary/10 tracking-wider text-xs px-3"
                    >
                        Manage Address
                    </Button>
                </div>

                {/* Address Details Inner Box */}
                <div className="relative flex items-start justify-between border border-border/80 rounded-xl p-5 md:p-6 bg-muted/30 hover:bg-muted/50 transition-colors">
                    <div className="space-y-4">
                        {/* Name and Phone */}
                        <div className="flex flex-wrap items-center gap-2 md:gap-3 text-base md:text-lg">
                            <span className="font-bold">{address.name}</span>
                            <span className="hidden md:inline text-muted-foreground/60">
                                |
                            </span>
                            <span className="text-muted-foreground font-medium">
                                {address.phone}
                            </span>
                        </div>

                        {/* Tag and Full Address */}
                        <div className="flex flex-wrap items-center gap-3">
                            <Badge
                                variant="default"
                                className="bg-primary text-primary-foreground font-bold tracking-wider px-2.5 py-0.5 text-[10px] rounded-full shadow-none pointer-events-none"
                            >
                                {address.division}
                            </Badge>
                            <p className="text-muted-foreground font-medium text-sm md:text-base leading-relaxed">
                                {address.address}
                            </p>
                        </div>
                    </div>

                    {/* Map Pin Icon */}
                    <div className="ml-4 shrink-0 text-primary p-2 bg-primary/10 rounded-full hidden sm:block">
                        <MapPin className="w-5 h-5 fill-current" />
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}