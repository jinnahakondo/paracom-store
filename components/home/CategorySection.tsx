import React from 'react'
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '../ui/carousel'
import { Card, CardContent } from '../ui/card'
import axiosInstance from '@/lib/axiosInstance'
import Image from 'next/image'
import Title from '../shared/SectionTitle'



export default async function CategorySection() {
    const res = await axiosInstance.get('/api/categories')

    const categories = res.data.data
    return (
        <div>
            <Title>Shop by Category</Title>
            <Carousel className="w-full">
                <CarouselContent className="-ml-1">
                    {categories.map((category) => (
                        <CarouselItem key={category._id} className="basis-1/3 pl:6 lg:pl-10 lg:basis-1/7 flex flex-col items-center justify-center gap-4">

                            <div className="p-1 w-full aspect-square">
                                <Card className="rounded-full overflow-hidden border w-full h-full flex items-center justify-center py-0">
                                    <CardContent className="flex items-center justify-center p-0 w-full h-full">
                                        <Image alt={category.name} height={100} width={100} src={category.image} className='w-full h-full' />
                                    </CardContent>
                                </Card>
                            </div>
                            <div className='text-sm lg:text-base font-bold capitalize'>{category.name}</div>
                        </CarouselItem>
                    ))}
                </CarouselContent>
                <CarouselPrevious variant={'default'} />
                <CarouselNext variant={"default"} />
            </Carousel>
        </div>
    )
}