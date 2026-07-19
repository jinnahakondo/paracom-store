"use client"
import React from 'react'
import {
    Drawer,
    DrawerContent,
    DrawerTrigger,
    DrawerTitle,
    DrawerHeader,
} from "@/components/ui/drawer"
import { Heart, Menu, } from 'lucide-react'
import { links } from '../navLinks';
import NavLink from '../NavLink';
import SearchBar from '../SearchBar';
import { useSession } from 'next-auth/react';



export default function Sidebar() {
    const [open, setOpen] = React.useState(false)
    const { data: session, status } = useSession()

    const mobileLinks = [
        {
            link: '/dashboard/wishlist',
            label: "Wishlist",
            icon: Heart
        },
        ...links,
    ]

    return (
        <Drawer direction='left' >
            <DrawerTrigger>
                <span
                    className='md:hidden hover:text-primary transition-colors'
                >
                    <Menu size={20} />
                </span>
            </DrawerTrigger>

            <DrawerContent >

                {/* Top Section */}
                <div className="flex flex-col">
                    {/* Header */}
                    <DrawerHeader >

                        <DrawerTitle className="text-xl font-bold text-gray-900">Menu</DrawerTitle>

                    </DrawerHeader>
                    <div className='p-4'>
                        <SearchBar open={open} setOpen={setOpen} />
                    </div>
                    {/* Navigation Links */}

                    <nav className="flex flex-col gap-1 p-4 ">
                        {mobileLinks.map((navItem) => {
                            const Icon = navItem.icon;
                            return (
                                <NavLink
                                    activeClassName='sidebar-active'
                                    key={navItem.link}
                                    href={navItem.link}
                                    className="flex items-center gap-4 px-4 py-4 text-gray-700 hover:bg-gray-50 rounded-xl transition-colors font-medium text-[15px]"
                                >
                                    {Icon && <Icon size={20} className="" />}
                                    {navItem.label}
                                </NavLink>
                            )
                        })}
                    </nav>

                </div>

            </DrawerContent>
        </Drawer>
    )
}