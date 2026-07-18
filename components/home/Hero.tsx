"use client"

import * as React from "react"
import Autoplay from "embla-carousel-autoplay"
import { Card, CardContent } from "@/components/ui/card"

import Image from "next/image"
import { Carousel, CarouselApi, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "../ui/carousel"
import SliderPagination from "./SliderPagination"


export function Hero() {

    const [api, setApi] = React.useState<CarouselApi>()
    const [current, setCurrent] = React.useState(0)
    const [count, setCount] = React.useState(0)

    React.useEffect(() => {
        if (!api) {
            return
        }

        const updateState = () => {
            setCount(api.scrollSnapList().length)
            setCurrent(api.selectedScrollSnap() + 1)
        }

        updateState()

        api.on("select", updateState)
        api.on("reInit", updateState)

        return () => {
            api.off("select", updateState)
            api.off("reInit", updateState)
        }
    }, [api])

    const plugin = React.useMemo(() => Autoplay(
        {
            delay: 3000,
            stopOnInteraction: false,
            stopOnMouseEnter: true
        }), [])

    const Slides = ["/images/hero-electronic.png", "/images/hero-grocery.png", '/images/hero-fitness.jpg']
    // "/images/hero-beauty.png", 

    return (
        <Carousel
            setApi={setApi}
            plugins={[plugin]}
            className="relative pt-16"
        >
            <CarouselContent>
                {Slides.map((slideImg, index) => (
                    <CarouselItem key={index}>
                        <div className="p-1">
                            <Card className="p-0">
                                <CardContent className="flex items-center justify-center w-full max-h-100 p-0 border aspect-video">
                                    <Image
                                        priority={index === 0}
                                        src={slideImg} alt="hero image" height={400} width={300} className="w-full h-full "
                                    />
                                </CardContent>
                            </Card>
                        </div>
                    </CarouselItem>
                ))}
            </CarouselContent>
            <CarouselPrevious className="left-0" />
            <CarouselNext className="right-0" />
            <div className="absolute bottom-10 right-1/2 -translate-x-1/2">
                <SliderPagination count={count} current={current} />
            </div>
        </Carousel>

    )
}
