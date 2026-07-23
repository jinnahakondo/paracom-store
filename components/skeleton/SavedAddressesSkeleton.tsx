"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";

export default function SavedAddressesSkeleton() {
    return (
        <div className=" space-y-6">
            {/* Header Skeleton */}
            <div className="flex items-center justify-between">
                <div className="space-y-2">
                    <Skeleton className="h-8 w-48" /> {/* Title */}
                    <Skeleton className="h-4 w-64" /> {/* Subtitle */}
                </div>
                <Skeleton className="h-10 w-32" /> {/* Add Address Button */}
            </div>

            {/* Grid Skeleton */}
            <div className="grid gap-4 md:grid-cols-2">
                {Array.from({ length: 4 }).map((_, i) => (
                    <Card key={i} className="flex flex-col justify-between">
                        <CardHeader className="pb-3">
                            <div className="flex items-start justify-between gap-2">
                                <div className="space-y-2 w-full">
                                    <Skeleton className="h-5 w-1/3" /> {/* Name */}
                                    <Skeleton className="h-3 w-1/4" /> {/* Phone */}
                                </div>
                                <Skeleton className="h-5 w-16 rounded-full" /> {/* Badge */}
                            </div>
                        </CardHeader>

                        <CardContent className="space-y-2">
                            <Skeleton className="h-4 w-full" /> {/* Address line 1 */}
                            <Skeleton className="h-4 w-4/5" />  {/* Address line 2 */}
                            <Skeleton className="h-3 w-3/4" />  {/* City, District, Division */}
                        </CardContent>

                        <CardFooter className="pt-3 flex items-center justify-between border-t border-border/50 mt-auto">
                            <Skeleton className="h-4 w-24" /> {/* Set as Default */}
                            <div className="flex items-center gap-2">
                                <Skeleton className="h-8 w-8 rounded-md" /> {/* Edit Icon */}
                                <Skeleton className="h-8 w-8 rounded-md" /> {/* Delete Icon */}
                            </div>
                        </CardFooter>
                    </Card>
                ))}
            </div>
        </div>
    );
}