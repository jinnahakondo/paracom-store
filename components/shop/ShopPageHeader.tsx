import React from "react"
import DynamicBreadcrumb, { BreadcrumbItemProps } from "../shared/DynamicBreadcrumb"

export default function ShopPageHeader() {
    const breadcrumbItems: BreadcrumbItemProps[] = [
        { label: "Home", href: "/" },
        { label: "Shop" },
    ]
    return (
        <header className="w-full bg-background text-foreground py-8  border-b border-border/40">
            <div className="flex flex-col gap-3">

                {/* Breadcrumb Navigation */}
                <DynamicBreadcrumb items={breadcrumbItems} />

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