"use client"
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ReactNode } from 'react'

interface INavlink {
    children: ReactNode
    href: string
    className?: string
    activeClassName?: string
}

export default function NavLink(
    { href, children, className, activeClassName }: INavlink) {
    const pathName = usePathname()
    const isActive = pathName === href || (href !== '/' && pathName.startsWith(href))

    return (
        <Link
            href={href}
            className={`${className} font-semibold ${isActive ? activeClassName : ''}`}
        >
            {children}
        </Link>
    )
}
