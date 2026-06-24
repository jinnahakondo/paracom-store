
import CategorySection from "@/components/home/CategorySection";
import { Hero } from "@/components/home/Hero";
import PopularSection from "@/components/home/PopularSection";
import { cateWiseProducts } from "@/data/categoryWiseProduct";
import CategoryWiseProducts from "@/components/home/category/CategoryWiseProducts";
import { Suspense } from "react";


export default async function Home() {

  return (
    <div className="w-full pb-16 space-y-16">
      <Hero />
      <Suspense fallback={'loading...'}>
        <CategorySection />
      </Suspense>
      <Suspense fallback={'loading...'}>
        <PopularSection />
      </Suspense>
      {
        cateWiseProducts.map(product => <Suspense key={product.categorySlug} fallback={'loading...'}>
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
