"use client"

import * as React from "react"

import { NavUser } from "@/components/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { LayoutDashboardIcon, Archive, ShoppingBag, CreditCard, Package, MapPinned, Star, Heart, Users } from "lucide-react"
import { useSession } from "next-auth/react"
import Link from "next/link"
import { NavItems } from "./nav-items"


const data = {
  navAdmin: [
    {
      title: "Overview",
      url: "/dashboard",
      icon: (
        <LayoutDashboardIcon
        />
      ),
    },
    {
      title: "Inventory",
      url: "/dashboard/inventory",
      icon: (
        <Archive
        />
      ),
    },
    {
      title: "Orders",
      url: "/dashboard/orders",
      icon: (
        <ShoppingBag
        />
      ),
    },
    {
      title: "Users",
      url: "/dashboard/users",
      icon: (
        <Users
        />
      ),
    },
    {
      title: "Payments",
      url: "/dashboard/payments",
      icon: (
        <CreditCard
        />
      ),
    },
  ],
  navUser: [
    {
      title: "Overview",
      url: "/dashboard",
      icon: (
        <LayoutDashboardIcon
        />
      ),
    },
    {
      title: "My Orders",
      icon: (
        <Package
        />
      ),
      isActive: true,
      url: "/dashboard/my-orders",
    },
    {
      title: "Saved Addresses",
      icon: (
        <MapPinned
        />
      ),
      url: "/dashboard/saved-addresses",
    },
    {
      title: "My Reviews",
      icon: (
        <Star
        />
      ),
      url: "/dashboard/my-reviews",
    },
    {
      title: "My Wishlist",
      icon: (
        <Heart
        />
      ),
      url: "/dashboard/my-wishlist",
    },
    {
      title: "My Payments",
      icon: (
        <CreditCard
        />
      ),
      url: "/dashboard/my-payments",
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {

  const { data: session, status } = useSession()

  const navItems = session?.user.role === "admin" ? data.navAdmin : data.navUser

  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:p-1.5!"
            >
              <Link href="/">
                <span className="text-base font-semibold">Paracom</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavItems items={navItems} />
        {/* <NavDocuments items={data.documents} />
        <NavSecondary items={data.navSecondary} className="mt-auto" /> */}
      </SidebarContent>
      <SidebarFooter>
        {
          session?.user &&
          <NavUser user={session.user} />
        }
      </SidebarFooter>
    </Sidebar>
  )
}
