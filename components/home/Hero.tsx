"use client"

import * as React from "react"
import Autoplay from "embla-carousel-autoplay"

import { Card, CardContent } from "@/components/ui/card"
import {
    Carousel,
    CarouselApi,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"
import Image from "next/image"

export function Hero() {
    const plugin = React.useMemo(
        () => Autoplay({ delay: 4000, stopOnInteraction: true }), []
    )

    const [api, setApi] = React.useState<CarouselApi>()
    const [current, setCurrent] = React.useState(0)
    const [count, setCount] = React.useState(0)

    React.useEffect(() => {
        if (!api) return

        const updateState = () => {
            setCount(api.scrollSnapList().length)
            setCurrent(api.selectedScrollSnap() + 1)
        }

        updateState()

        api.on("init", updateState)
        api.on("select", updateState)

        return () => {
            api.off("init", updateState)
            api.off("select", updateState)
        }
    }, [api])

    const Slides = ["/images/hero.png", "/images/hero2.jpeg", "/images/hero3.png"]

    return (
        <Carousel
            plugins={[plugin]}
            className="w-full"
            onMouseEnter={() => plugin.stop()}
            onMouseLeave={() => plugin.play()}
            setApi={setApi}
        >
            <CarouselContent className="mt-8">
                {Slides.map((slideImg, index) => (
                    <CarouselItem key={index}>
                        <div className="p-1">
                            <Card className="p-0">
                                <CardContent className="flex items-center justify-center w-full max-h-100 p-0 border">
                                    <Image
                                        priority={index === 0}
                                        src={slideImg} alt="hero image" height={400} width={300} className="w-full h-fit " />
                                </CardContent>
                            </Card>
                        </div>
                    </CarouselItem>
                ))}
            </CarouselContent>
            <div className="py-2 flex items-center justify-center gap-2">
                {
                    [...Array(Slides.length)].map((a, i) => <div
                        onClick={() => api?.scrollTo(i)}
                        key={i} className={`h-4 w-4 rounded-full border-2 ${current === i + 1 ? "border-primary" : "border-primary/20"}`}></div>)
                }
            </div>
            <CarouselPrevious />
            <CarouselNext />
        </Carousel>
    )
}
