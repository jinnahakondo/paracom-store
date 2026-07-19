"use client"
import React from 'react'
import NavLink from './NavLink'
import { Heart, Search, User } from 'lucide-react'
import Cart from '../cart/Cart'
import Link from 'next/link'
import Sidebar from './mobile/Sidebar'
import { links } from './navLinks'
import { useSession } from 'next-auth/react'
import { DropdownMenuAvatar } from './DropdownMenuAvatar'
import Logo from '../logo/Logo'
import SearchBar from './SearchBar'



export default function Navbar() {
    const [open, setOpen] = React.useState(false)

    const { data: session, status } = useSession()


    return (
        <div className='w-full h-20 bg-background border-b border-border '>
            <div className='h-full w-full flex justify-between items-center mx-auto max-w-7xl gap-4 px-3'>

                {/* Left Side: Logo & Navigation */}
                <div className='flex items-center gap-10'>
                    <div className='flex items-center justify-center '>
                        {/* Mobile Menu Button */}
                        <Sidebar />
                        {/* Logo */}
                        <Logo />
                    </div>

                    {/* Navigation Links */}
                    <div className='hidden md:block'>
                        <nav className='flex items-center gap-6 text-sm font-medium text-muted-foreground'>
                            {
                                links.map((navItem) => (

                                    <NavLink
                                        activeClassName='active'
                                        key={navItem.link} href={navItem.link}>
                                        {navItem.label}
                                    </NavLink>
                                ))
                            }
                        </nav>
                    </div>
                </div>

                {/* Right Side: Search, Cart, Wishlist & Profile */}
                <div className='flex items-center md:gap-6'>
                    {/* Shadcn Input with Search Icon */}
                    <div className='hidden md:block max-w-64'>

                        <Search
                            onClick={() => setOpen(true)}
                            size={20} />
                        <SearchBar open={open} setOpen={setOpen} />
                    </div>
                    {/* Action Buttons */}
                    <div className='flex items-center md:gap-4 text-foreground'>
                        <Cart />

                        {/* Desktop Only Actions */}
                        <div className='hidden md:flex items-center gap-4'>
                            {/* Wishlist Button */}
                            <Link href={'/dashboard/wishlist'}
                                className='p-2 hover:text-primary transition-colors rounded-full hover:bg-muted/50'
                                aria-label="View Wishlist"
                            >
                                <Heart size={20} className=' stroke-[1.5]' />
                            </Link>
                        </div>
                        {/* Profile Button */}
                        {
                            status === "authenticated" ?
                                <DropdownMenuAvatar user={session.user} />
                                :
                                <Link href={'/login'}
                                    className='p-2 hover:text-primary transition-colors rounded-full hover:bg-muted/50'
                                    aria-label="View Profile"
                                >
                                    <User className='h-5 w-5 stroke-[1.5]' />
                                </Link>
                        }
                    </div>

                </div>
            </div>
        </div>
    )
}