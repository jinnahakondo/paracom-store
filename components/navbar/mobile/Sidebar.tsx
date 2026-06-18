
import React from 'react'
import {
    Drawer,
    DrawerContent,
    DrawerTrigger,
    DrawerClose,
    DrawerTitle,
    DrawerHeader,
    DrawerFooter,
} from "@/components/ui/drawer"
import { Heart, Menu, X } from 'lucide-react'
import { links } from '../navLinks';
import NavLink from '../NavLink';
import SearchBar from '../SearchBar';
import LogOutButton from '@/components/LogOutButton';
import { getServerSession } from 'next-auth';



export default async function Sidebar() {

    const session = await getServerSession()

    const mobileLinks = [
        {
            link: '/dashboard/wishlist',
            label: "Wishlist",
            icon: Heart
        },
        ...links,
    ]

    return (
        <Drawer direction='left'>
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
                        <div className="flex items-center justify-between py-3 border-b border-gray-100 ">
                            <DrawerTitle className="text-xl font-bold text-gray-900">Menu</DrawerTitle>
                            <DrawerClose asChild>
                                <button className="p-1 text-gray-500 hover:text-gray-900 transition-colors">
                                    <X size={20} />
                                </button>
                            </DrawerClose>
                        </div>
                    </DrawerHeader>
                    <div className='p-4'>
                        <SearchBar />
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

                <DrawerFooter className='flex items-center justify-center'>
                    {/* log out / log in button  */}
                    {
                        session ?
                            <LogOutButton />
                            :
                            <NavLink className='text-primary' href='/login'>
                                Login
                            </NavLink>
                    }
                </DrawerFooter>

            </DrawerContent>
        </Drawer>
    )
}