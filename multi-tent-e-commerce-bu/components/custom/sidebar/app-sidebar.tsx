// components/admin/app-sidebar.tsx
"use client";

import * as React from "react";
import {
  LayoutDashboard,
  ShoppingCart,
  Package,
  Users,
  Settings,
  Tag,
  BarChart3,
  Truck,
  MessageSquare,
  Palette,
  Globe,
  CreditCard,
  FileText,
  HelpCircle,
  LogOut,
  ChevronUp,
  Store,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

// Sidebar data structure
const sidebarData = [
  {
    title: "Quick View",
    items: [
      {
        title: "Dashboard",
        url: "/shop-profile",
        icon: LayoutDashboard,
      },
      {
        title: "Analytics",
        url: "/admin/analytics",
        icon: BarChart3,
      },
    ],
  },
  {
    title: "E-Commerce",
    items: [
      {
        title: "Products",
        url: "/admin/products",
        icon: Package,
      },
      {
        title: "Orders",
        url: "/admin/orders",
        icon: ShoppingCart,
      },
      {
        title: "Customers",
        url: "/admin/customers",
        icon: Users,
      },
      {
        title: "Categories",
        url: "/admin/categories",
        icon: Tag,
      },
      {
        title: "Shipping",
        url: "/admin/shipping",
        icon: Truck,
      },
    ],
  },
  {
    title: "Website Settings",
    items: [
      {
        title: "Store Settings",
        url: "/admin/store-settings",
        icon: Store,
      },
      {
        title: "Theme & Design",
        url: "/admin/theme",
        icon: Palette,
      },
      {
        title: "Domain",
        url: "/admin/domain",
        icon: Globe,
      },
      {
        title: "Payment Methods",
        url: "/admin/payments",
        icon: CreditCard,
      },
    ],
  },
  {
    title: "Content",
    items: [
      {
        title: "Pages",
        url: "/admin/pages",
        icon: FileText,
      },
      {
        title: "Reviews",
        url: "/admin/reviews",
        icon: MessageSquare,
      },
    ],
  },
  {
    title: "System",
    items: [
      {
        title: "Settings",
        url: "/admin/settings",
        icon: Settings,
      },
    ],
  },
];

// User data - replace with actual user data from your auth
const userData = {
  name: "John Doe",
  email: "john@example.com",
  avatar: "/avatars/user.jpg",
  role: "Admin",
};

export function AppSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const { state } = useSidebar();

  return (
    <Sidebar collapsible="icon">
      {/* Header with Logo */}
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                <Store className="size-4" />
              </div>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-semibold">Admin Panel</span>
                <span className="truncate text-xs text-muted-foreground">
                  E-Commerce
                </span>
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      {/* Main Content */}
      <SidebarContent
        className={cn("", {
          "pt-8": state === "collapsed",
        })}
      >
        {sidebarData.map((section) => (
          <SidebarGroup key={section.title}>
            <SidebarGroupLabel>{section.title}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {section.items.map((item) => {
                  const isActive = pathname === item.url;
                  return (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton
                        asChild
                        isActive={isActive}
                        onClick={() => router.push(item.url)}
                      >
                        <a
                          className=" flex justify-center items-center gap-1"
                          href={item.url}
                        >
                          <item.icon />
                          <span
                            className={cn("", {
                              "md:hidden": state === "collapsed",
                            })}
                          >
                            {item.title}
                          </span>
                        </a>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  );
                })}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>

      {/* Footer with Help and User */}
      <SidebarFooter>
        {/* Get Help Section */}
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton onClick={() => router.push("/admin/help")}>
              <HelpCircle />
              <span>Get Help</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>

        {/* User Dropdown */}
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton
                  size="lg"
                  className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                >
                  <Avatar className="h-8 w-8 rounded-lg">
                    <AvatarImage src={userData.avatar} alt={userData.name} />
                    <AvatarFallback className="rounded-lg">
                      {userData.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="truncate font-semibold">
                      {userData.name}
                    </span>
                    <span className="truncate text-xs text-muted-foreground">
                      {userData.email}
                    </span>
                  </div>
                  <ChevronUp className="ml-auto size-4" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
                side={state === "collapsed" ? "right" : "bottom"}
                align="end"
                sideOffset={4}
              >
                <DropdownMenuItem onClick={() => router.push("/admin/profile")}>
                  <Users className="mr-2 h-4 w-4" />
                  Profile
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => router.push("/admin/account")}>
                  <Settings className="mr-2 h-4 w-4" />
                  Account Settings
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => console.log("Logout")}>
                  <LogOut className="mr-2 h-4 w-4" />
                  Log out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
