'use client'

import * as React from 'react'
import { House, MessageSquareWarning, Package, TicketPercent, Users, Store } from 'lucide-react'

import Link from 'next/link'
import { NavUser } from '@components/nav-user'
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from '@components/ui/sidebar'

const navItems = [
  { name: 'Trang chủ', url: '/', icon: House },
  { name: 'Người dùng', url: '/users', icon: Users },
  { name: 'Gian hàng', url: '/shops', icon: Store },
  { name: 'Sản phẩm', url: '/products', icon: Package },
  { name: 'Ưu đãi', url: '/vouchers', icon: TicketPercent },
  { name: 'Báo cáo', url: '/reports', icon: MessageSquareWarning },
]

export function AppSidebar({ ...props }) {
  return (
    <Sidebar
      collapsible='icon'
      {...props}
    >
      <SidebarHeader>
        <NavUser />
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {navItems.map((item) => (
                <SidebarMenuItem key={item.name}>
                  <SidebarMenuButton asChild>
                    <Link href={item.url}>
                      <item.icon />
                      <span>{item.name}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  )
}
