import React from 'react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './ui/card'
import Link from 'next/link'
import { Badge } from './ui/badge'
import Image from 'next/image'
import { FaBangladeshiTakaSign } from 'react-icons/fa6'
import { FaRegStar, FaStar, FaStarHalfAlt } from 'react-icons/fa'
import { CategoryType, ProductType } from '@/types/types'
import AddToCartButton from './buttons/AddToCartButton'


export default function ProductCard({ product }: { product: ProductType<CategoryType> }) {
    const renderStars = (rating: number) => {
        const stars = [];
        for (let i = 1; i <= 5; i++) {
            if (i <= rating) {
                stars.push(<FaStar key={i} className="text-amber-500" />);
            } else if (i - 0.5 <= rating) {
                stars.push(<FaStarHalfAlt key={i} className="text-amber-500" />);
            } else {
                stars.push(<FaRegStar key={i} className="text-amber-300" />);
            }
        }
        return stars;
    };
    return (
        <Card key={product._id} className="relative mx-auto w-full pt-0 flex flex-col justify-between overflow-hidden group hover:shadow-md transition-shadow">

            <Link href={`/shop/${product.slug}`} className="block cursor-pointer flex-1">
                {/* Added 'relative' here to position the badge over the image */}
                <div className="relative">

                    {/* 2. Dynamic Badge Logic */}
                    <div className="absolute top-3 left-3 z-10 flex flex-col gap-1">

                        <Badge variant="default" className='capitalize'>
                            {product.category?.name || "Popular"}
                        </Badge>
                    </div>

                    <Image
                        width={300}
                        height={200}
                        alt={product.title}
                        src={product.images[0]}
                        className='h-48 w-full object-cover rounded-t-xl group-hover:scale-[1.02] transition-transform duration-200'
                    />
                    <CardHeader>
                        <CardTitle className='w-full text-base group-hover:text-primary transition-colors'>{product.title}</CardTitle>
                        <CardDescription>
                            {product.description.slice(0, 60)}...
                        </CardDescription>
                    </CardHeader>

                    <CardContent>
                        <div className='flex items-center gap-1.5'>
                            <div className='flex items-center text-sm'>
                                {renderStars(product.averageRating)}
                            </div>
                            <span className='text-xs font-semibold text-muted-foreground pt-0.5'>
                                {product.averageRating} ({product.totalReviews})
                            </span>
                        </div>
                    </CardContent>
                </div>
            </Link>

            <CardFooter>
                <div className='flex justify-between items-center w-full'>
                    <div className='flex-1 flex items-baseline gap-2'>
                        <p className='flex items-center font-bold text-lg text-primary'>
                            <FaBangladeshiTakaSign className="text-sm mr-0.5" />
                            {product.discountPrice || product.price}
                        </p>
                        {product.discountPrice && (
                            <p className='flex items-center text-sm line-through text-muted-foreground'>
                                <FaBangladeshiTakaSign className="text-xs" />
                                {product.price}
                            </p>
                        )}
                    </div>
                    <AddToCartButton product={product} />
                </div>
            </CardFooter>
        </Card>
    )
}
