import React from 'react'
import { Card, CardContent, CardFooter, CardHeader } from '../ui/card'
import { Skeleton } from '../ui/skeleton'


export default function ProductCardSkeleton() {
    return (
        <Card className="mx-auto w-full pt-0 flex flex-col justify-between overflow-hidden">
            <div className="flex-1">
                {/* Image Placeholder */}
                <Skeleton className="h-48 w-full rounded-t-xl rounded-b-none" />

                <CardHeader className="space-y-2">
                    {/* Title Placeholder */}
                    <Skeleton className="h-5 w-4/5" />
                    {/* Description Placeholder */}
                    <Skeleton className="h-4 w-full" />
                </CardHeader>

                <CardContent>
                    {/* Ratings Placeholder */}
                    <div className='flex items-center gap-1.5'>
                        <div className='flex items-center gap-0.5'>
                            {[...Array(5)].map((_, i) => (
                                <Skeleton key={i} className="h-4 w-4 rounded-full" />
                            ))}
                        </div>
                        <Skeleton className='h-3 w-12' />
                    </div>
                </CardContent>
            </div>

            <CardFooter>
                <div className='flex justify-between items-center w-full'>
                    {/* Price Placeholder */}
                    <div className='flex items-baseline gap-2'>
                        <Skeleton className="h-6 w-16" />
                    </div>
                    {/* Button Placeholder */}
                    <Skeleton className="h-9 w-24 rounded-md" />
                </div>
            </CardFooter>
        </Card>
    )
}