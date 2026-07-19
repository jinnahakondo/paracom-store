

import PopularSection from "@/components/home/PopularSection";
import { cateWiseProducts } from "@/data/categoryWiseProduct";
import CategoryWiseProducts from "@/components/home/category/CategoryWiseProducts";
import { Suspense } from "react";
import ProductCardSkeleton from "@/components/skeleton/ProductCardSekleton";
import { Skeleton } from "@/components/ui/skeleton";
import { Hero } from "@/components/home/Hero";
import CategorySection from "@/components/home/CategorySection";


export default async function Home() {

  const loadingProducts = <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 pb-16 gap-6">
    {
      [...Array(4)].map((_, i) => <ProductCardSkeleton key={i} />)
    }
  </div>

  const loadingCategories = <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-7 gap-4">
    {
      [...Array(7)].map((_, i) => <Skeleton key={i} className="h-28 w-28 rounded-full" />)
    }
  </div>

  return (
    <div className="w-full pb-16 space-y-16 pt-4">
      <Hero />
      <Suspense fallback={loadingCategories}>
        <CategorySection />
      </Suspense>
      <Suspense fallback={loadingProducts}>
        <PopularSection />
      </Suspense>
      {
        cateWiseProducts.map(product => <Suspense key={product.categorySlug} fallback={loadingProducts}>
          <CategoryWiseProducts
            key={product.categorySlug}
            categorySlug={product.categorySlug} >
            {product.title}
          </CategoryWiseProducts>
        </Suspense>)
      }

    </div>
  )
}
