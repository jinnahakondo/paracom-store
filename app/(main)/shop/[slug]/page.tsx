import DynamicBreadcrumb from '@/components/shared/DynamicBreadcrumb'
import ImageGallery from '@/components/shop/ImageGallery'
import ProductDescriptionReviewsTab from '@/components/shop/ProductDescription&ReviewsTab'
import RelatedProducts from '@/components/shop/RelatedProducts'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { productDetailsBreadcrumbs } from '@/data/breadcrumbData'
import {  ProductType } from '@/types/Product'
import { Award, Clock, ShieldCheck, ShoppingCart, Star } from 'lucide-react'
import React, { Fragment } from 'react'

export default async function ProductDetails({ params }:
    { params: Promise<{ slug: string }> }) {
    const { slug } = await params

    const url = `${process.env.BASE_URL}/api/products/${slug}`

    const res = await fetch(url)

    if (!res.ok) {
        throw new Error("failed to get data")
    }

    const { data: product }: { data: ProductType } = await res.json()


    const savings = product.discountPrice && product.price > product.discountPrice
        ? Math.round(((product.price - product.discountPrice) / product.price) * 100)
        : 0

    return (
        <div className='py-16 '>
            <DynamicBreadcrumb items={productDetailsBreadcrumbs} />

            <div className='grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-16 '>
                {/* Images*/}
                <ImageGallery images={product.images} title={product.title} />

                {/* Details Column */}
                <div className="flex flex-col justify-between space-y-6">
                    <div className="space-y-4">
                        <div className="flex items-center justify-between">
                            <span className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
                                {product.brand}
                            </span>
                            <Badge variant="secondary" className="font-normal">
                                AI Recommended
                            </Badge>
                        </div>

                        <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground">
                            {product.title}
                        </h1>

                        <div className="flex items-center gap-2">
                            <div className="flex items-center text-amber-500">
                                {[...Array(5)].map((_, i) => (
                                    <Star
                                        key={i}
                                        className={`h-4 w-4 fill-current ${i < Math.floor(product.averageRating) ? 'text-amber-500' : 'text-muted/40'
                                            }`}
                                    />
                                ))}
                            </div>
                            <span className="text-sm font-semibold text-foreground">
                                {product.averageRating}
                            </span>
                            <span className="text-sm text-muted-foreground">
                                | &nbsp; {product.totalReviews} Reviews
                            </span>
                        </div>

                        <div className="pt-2 flex items-baseline gap-3">
                            {product.discountPrice ? (
                                <>
                                    <span className="text-4xl font-bold tracking-tight text-foreground">
                                        ${product.discountPrice.toFixed(2)}
                                    </span>
                                    <span className="text-xl text-muted-foreground line-through">
                                        ${product.price.toFixed(2)}
                                    </span>
                                    <Badge variant="destructive" className="ml-2">
                                        Save {savings}%
                                    </Badge>
                                </>
                            ) : (
                                <span className="text-4xl font-bold tracking-tight text-foreground">
                                    ${product.price.toFixed(2)}
                                </span>
                            )}
                        </div>

                        <p className="text-xs text-muted-foreground">
                            Free 2-day shipping & 30-day returns
                        </p>

                        <Card className="bg-muted/40 border shadow-none">
                            <CardContent className="p-4 space-y-3">
                                <div className="flex items-center gap-2 text-sm font-semibold text-primary">
                                    <Award className="h-4 w-4" />
                                    <span>AI Product Insights</span>
                                </div>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-muted-foreground pt-1">
                                    <div className="flex items-center gap-2">
                                        <ShieldCheck className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                                        <span>Authentic Sourced Quality</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Clock className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                                        <span>Certified Secure Batch</span>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        <div className="space-y-3 pt-6 border-t">
                            <div className='flex items-center gap-4'>
                                <p>Quantity</p>
                                <div className='flex items-center gap-2'>
                                    <Button variant={"secondary"} className='text-2xl'>-</Button>
                                    <span>1</span>
                                    <Button variant={"secondary"} className='text-2xl'>+</Button>
                                </div>
                            </div>
                            <div className="flex flex-col sm:flex-row gap-3">
                                <Button size="lg" className="flex-1 gap-2 shadow-sm font-medium">
                                    <ShoppingCart className="h-4 w-4" /> Add to Cart
                                </Button>
                                <Button size="lg" variant="secondary" className="flex-1 font-medium">
                                    Buy Now
                                </Button>
                            </div>

                            <div className="text-center">
                                <span className={`text-xs ${product.stock > 0 ? 'text-emerald-600 dark:text-emerald-400' : 'text-destructive'}`}>
                                    {product.stock > 0 ? `In Stock (${product.stock} units available)` : 'Out of Stock'}
                                </span>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
            {/* product description & customer reviews  */}
            <div className="py-10">
                <ProductDescriptionReviewsTab description={product.description} />
            </div>
            {/* related products  */}
            <RelatedProducts categoryId={product.category} />
        </div>
    )

}
