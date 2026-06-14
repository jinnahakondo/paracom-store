import React from 'react'
import NavLink from './NavLink'
import { Heart, User, Menu } from 'lucide-react'
import SearchBar from './SearchBar'
import Cart from './Cart'

export default function Navbar() {
    const links = [
        { link: '/shop', label: "Shop" },
        { link: '/about', label: "About" },
        { link: '/categories', label: "Categories" },
        { link: '/support', label: "Support" },
    ]

    return (
        <div className='w-full h-20 bg-background border-b border-border px-6'>
            <div className='h-full w-full flex justify-between items-center mx-auto max-w-7xl gap-4'>

                {/* Left Side: Logo & Navigation */}
                <div className='flex items-center gap-10'>
                    {/* Logo */}
                    <h2 className='text-2xl font-bold text-foreground tracking-tight'>Aetheria</h2>

                    {/* Navigation Links */}
                    <div className='hidden md:block'>
                        <nav className='flex items-center gap-6 text-sm font-medium text-muted-foreground'>
                            {
                                links.map((navItem) => (
                                    // Using the unique link path as the key instead of array index
                                    <NavLink key={navItem.link} href={navItem.link}>
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
                    <SearchBar />

                    {/* Action Buttons */}
                    <div className='flex items-center gap-4 text-foreground'>
                        <Cart />

                        {/* Mobile Menu Button - Added aria-label & button tag for accessibility */}
                        <button
                            className='md:hidden p-2 hover:text-primary transition-colors'
                            aria-label="Open Menu"
                        >
                            <Menu size={20} />
                        </button>

                        {/* Desktop Only Actions */}
                        <div className='hidden md:flex items-center gap-4'>
                            {/* Wishlist Button */}
                            <button
                                className='p-2 hover:text-primary transition-colors rounded-full hover:bg-muted/50'
                                aria-label="View Wishlist"
                            >
                                <Heart className='h-5 w-5 stroke-[1.5]' />
                            </button>

                            {/* Profile Button */}
                            <button
                                className='p-2 hover:text-primary transition-colors rounded-full hover:bg-muted/50'
                                aria-label="View Profile"
                            >
                                <User className='h-5 w-5 stroke-[1.5]' />
                            </button>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}