import React from 'react'
import {
    Drawer,
    DrawerContent,
    DrawerTrigger,
    DrawerClose,
} from "@/components/ui/drawer"
import { Menu, X, CircleUser } from 'lucide-react'
import { links } from '../navLinks';
import NavLink from '../NavLink';
import SearchBar from '../SearchBar';


export default function Sidebar() {
    return (
        <Drawer direction='right'>
            <DrawerTrigger asChild>
                <button
                    className='md:hidden p-2 hover:text-primary transition-colors'
                    aria-label="Open Menu"
                >
                    <Menu size={20} />
                </button>
            </DrawerTrigger>

            {/* The fixed h-full and right-0 alignments make it slide out like a standard sidebar drawer */}
            <DrawerContent className="top-0 right-0 left-auto mt-0 h-full w-[280px] rounded-l-3xl rounded-r-none border-l bg-white p-0 flex flex-col justify-between">

                {/* Top Section */}
                <div className="flex flex-col">
                    {/* Header */}
                    <div className="flex items-center justify-between p-6 border-b border-gray-100">
                        <span className="text-xl font-bold text-gray-900">Menu</span>
                        <DrawerClose asChild>
                            <button className="p-1 text-gray-500 hover:text-gray-900 transition-colors">
                                <X size={20} />
                            </button>
                        </DrawerClose>
                    </div>
                    <div className='p-4'>
                        <SearchBar />
                    </div>
                    {/* Navigation Links */}
                    <nav className="flex flex-col gap-1 p-4 ">
                        {links.map((navItem) => {
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

                {/* Footer Profile Section */}
                <div className="bg-gray-50 p-6 border-t border-gray-100 flex items-center gap-4">
                    <CircleUser size={28} className="text-gray-700" />
                    <div className="flex flex-col">
                        <span className="text-sm font-bold text-gray-900">Neural ID: 8292</span>
                        <a href="/settings" className="text-xs text-blue-600 hover:underline font-medium">
                            Settings
                        </a>
                    </div>
                </div>

            </DrawerContent>
        </Drawer>
    )
}