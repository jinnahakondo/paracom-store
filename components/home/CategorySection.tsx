import React from 'react'
import { Carousel, CarouselContent, CarouselItem } from '../ui/carousel'
import { Card, CardContent } from '../ui/card'
import Image from 'next/image'
import Title from '../shared/SectionTitle'
import { categoryType } from '@/types/category'
import Link from 'next/link'

export default async function CategorySection() {
    const res = await fetch(`${process.env.BASE_URL}/api/categories`)
    if (!res.ok) {
        throw new Error("failed to fetch data")
    }
    const { data: categories } = await res.json()

    return (
        <div>
            <Title>Shop by Category</Title>
            <Carousel className="w-full  ">
                <CarouselContent className="-ml-4 lg:-ml-10">
                    {categories.map((category: categoryType) => (
                        <CarouselItem key={category._id} className="basis-1/3 pl-4 lg:pl-10 sm:basis-1/4 md:basis-1/5 lg:basis-1/7 flex flex-col items-center justify-center gap-4 group">

                            <Link href={`/shop?category=${category.slug}`}>
                                <div className="w-full aspect-square">
                                    <Card className="rounded-full overflow-hidden border w-full h-full flex items-center justify-center py-0">
                                        <CardContent className="flex items-center justify-center p-0 w-full h-full">
                                            <Image alt={category.name} height={100} width={100} src={category.image} className='w-full h-full group-hover:scale-110 transition-transform duration-200' />
                                        </CardContent>
                                    </Card>
                                </div>
                            </Link>
                            <div className='text-xs lg:text-base font-bold capitalize group-hover:text-primary'>{category.name}</div>
                        </CarouselItem>
                    ))}
                </CarouselContent>

            </Carousel>
        </div>
    )
}