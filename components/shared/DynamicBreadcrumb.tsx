import React, { Fragment } from "react"
import Link from "next/link"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { BreadcrumbItemProps } from "@/data/breadcrumbData"



interface DynamicBreadcrumbProps {
  items: BreadcrumbItemProps[]
}

export default function DynamicBreadcrumb({ items }: DynamicBreadcrumbProps) {
  if (!items || items.length === 0) return null

  return (
    <Breadcrumb className="mb-5">
      <BreadcrumbList>
        {items.map((item, index) => {
          const isLast = index === items.length - 1

          return (
            <Fragment key={item.label + index}>
              <BreadcrumbItem>
                {isLast || !item.href ? (
                  // Current Page (Non-clickable state)
                  <BreadcrumbPage>{item.label}</BreadcrumbPage>
                ) : (
                  // Navigable Path Link using Next.js Link composition
                  <BreadcrumbLink asChild>
                    <Link href={item.href}>{item.label}</Link>
                  </BreadcrumbLink>
                )}
              </BreadcrumbItem>

              {/* Add Separator if it's not the last element */}
              {!isLast && <BreadcrumbSeparator />}
            </Fragment>
          )
        })}
      </BreadcrumbList>
    </Breadcrumb>
  )
}