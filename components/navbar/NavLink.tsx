"use client"
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ReactNode } from 'react'

export default function NavLink({ href, children }: { href: string, children: ReactNode }) {
    const pathName = usePathname()
    const isActive = pathName.endsWith(href)

    return (
        <Link href={href}
            className={`font-semibold 
                ${isActive && 'text-primary active'}`}
        >
            {children}
        </Link>
    )
}
