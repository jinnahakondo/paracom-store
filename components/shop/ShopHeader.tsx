import React from "react"
import Link from "next/link"
import { ChevronRight } from "lucide-react"

export default function ShopHeader() {
  return (
    <header className="w-full bg-background text-foreground py-8 px-6 md:px-12 border-b border-border/40">
      <div className="flex flex-col gap-3">
        
        {/* Breadcrumb Navigation */}
        <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs font-medium">
          <Link 
            href="#" 
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            Marketplace
          </Link>
          <ChevronRight className="h-3 w-3 text-muted-foreground/60" strokeWidth={2.5} />
          <span className="text-foreground font-semibold" aria-current="page">
            Neural Wearables
          </span>
        </nav>

        {/* Page Title & Description */}
        <div className="flex flex-col gap-2 max-w-2xl">
          <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Neural Wearables
          </h1>
          <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
            Precision-engineered bio-interfaces designed for high-performance cognition, health 
            optimization, and seamless human-AI integration.
          </p>
        </div>

      </div>
    </header>
  )
}