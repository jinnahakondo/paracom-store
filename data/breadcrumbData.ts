export interface BreadcrumbItemProps {
    label: string
    href?: string
}

export const shopBreadcrumbs: BreadcrumbItemProps[] = [
    { label: "Home", href: "/" },
    { label: "Shop" },
]

export const productDetailsBreadcrumbs: BreadcrumbItemProps[] = [
    { label: "Home", href: "/" },
    { label: "Shop", href: '/shop' },
    { label: "Details" },

]