import CategorySection from "@/components/home/CategorySection";
import { Hero } from "@/components/home/Hero";


export default async function Home() {

  return (
    <div className="w-full space-y-16">
      <Hero />
      <CategorySection />
    </div>
  )
}
