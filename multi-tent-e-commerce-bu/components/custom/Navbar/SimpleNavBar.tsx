"use client";
import * as React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useEffect, useState, useRef } from "react";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Search, User, Plus, Menu, LogIn, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";

const Logo = (props: React.SVGAttributes<SVGElement>) => {
  return (
    <svg
      width="1em"
      height="1em"
      viewBox="0 0 324 323"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      {...(props as any)}
    >
      <rect
        x="88.1023"
        y="144.792"
        width="151.802"
        height="36.5788"
        rx="18.2894"
        transform="rotate(-38.5799 88.1023 144.792)"
        fill="currentColor"
      />
      <rect
        x="85.3459"
        y="244.537"
        width="151.802"
        height="36.5788"
        rx="18.2894"
        transform="rotate(-38.5799 85.3459 244.537)"
        fill="currentColor"
      />
    </svg>
  );
};

const HamburgerIcon = ({
  className,
  ...props
}: React.SVGAttributes<SVGElement>) => (
  <Menu className={cn("h-5 w-5", className)} {...(props as any)} />
);

export interface Navbar01Props extends React.HTMLAttributes<HTMLElement> {
  logo?: React.ReactNode;
  logoHref?: string;
  onSignInClick?: () => void;
  onCtaClick?: () => void;
  onSearch?: (query: string) => void;
  searchPlaceholder?: string;
}

export const SimpleNavBAr = React.forwardRef<HTMLElement, Navbar01Props>(
  (
    {
      className,
      logo = <Logo />,
      logoHref = "/",
      onSignInClick,
      onCtaClick,
      onSearch,
      searchPlaceholder = "Search products...",
      ...props
    },
    ref
  ) => {
    const [isMobile, setIsMobile] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const containerRef = useRef<HTMLElement>(null);
    const router = useRouter();
    const pathname = usePathname(); // Use pathname to check active route

    useEffect(() => {
      const checkWidth = () => {
        if (containerRef.current) {
          const width = containerRef.current.offsetWidth;
          setIsMobile(width < 768);
        }
      };
      checkWidth();
      const resizeObserver = new ResizeObserver(checkWidth);
      if (containerRef.current) {
        resizeObserver.observe(containerRef.current);
      }
      return () => {
        resizeObserver.disconnect();
      };
    }, []);

    const handleSearchSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      if (searchQuery.trim() && onSearch) {
        onSearch(searchQuery.trim());
      }
    };

    const combinedRef = React.useCallback(
      (node: HTMLElement | null) => {
        containerRef.current = node;
        if (typeof ref === "function") {
          ref(node);
        } else if (ref) {
          ref.current = node;
        }
      },
      [ref]
    );

    // Helper function to check if route is active
    const isActive = (path: string) => pathname === path;

    return (
      <header
        ref={combinedRef}
        className={cn(
          "sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 px-4 md:px-6 [&_*]:no-underline",
          className
        )}
        {...(props as any)}
      >
        <div className="container mx-auto flex h-16 max-w-screen-2xl items-center justify-between gap-4">
          {/* Left side */}
          <div className="flex items-center gap-2">
            {/* Mobile menu trigger */}
            {isMobile && (
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    className="h-9 w-9 hover:bg-accent hover:text-accent-foreground"
                    variant="ghost"
                    size="icon"
                  >
                    <HamburgerIcon />
                  </Button>
                </PopoverTrigger>
                <PopoverContent align="start" className="w-48 p-2">
                  <NavigationMenu className="max-w-none">
                    <NavigationMenuList className="flex-col items-start gap-1">
                      <NavigationMenuItem onClick={() => router.push("/")}>
                        <button
                          className={cn(
                            "flex w-full items-center rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground cursor-pointer no-underline",
                            isActive("/")
                              ? "bg-accent text-accent-foreground"
                              : "text-foreground/80"
                          )}
                        >
                          Home
                        </button>
                      </NavigationMenuItem>
                      <NavigationMenuItem
                        onClick={() => router.push("/product")}
                        className="w-full"
                      >
                        <button
                          className={cn(
                            "flex w-full items-center rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground cursor-pointer no-underline",
                            isActive("/product")
                              ? "bg-accent text-accent-foreground"
                              : "text-foreground/80"
                          )}
                        >
                          Products
                        </button>
                      </NavigationMenuItem>
                    </NavigationMenuList>
                  </NavigationMenu>
                </PopoverContent>
              </Popover>
            )}

            {/* Logo */}
            <button
              onClick={(e) => {
                e.preventDefault();
                window.location.href = logoHref;
              }}
              className="flex items-center space-x-2 text-primary hover:text-primary/90 transition-colors cursor-pointer"
            >
              <div className="text-2xl">{logo}</div>
              <span className="hidden font-bold text-xl sm:inline-block">
                CodeSprint Lab
              </span>
            </button>
          </div>

          {/* Center - Navigation (Desktop) / Search (Mobile) */}
          <div className="flex-1 flex items-center justify-center gap-4 max-w-md">
            {/* Desktop Navigation */}
            {!isMobile && (
              <NavigationMenu className="flex">
                <NavigationMenuList className="gap-1">
                  <NavigationMenuItem onClick={() => router.push("/")}>
                    <button
                      className={cn(
                        "group inline-flex h-9 w-max items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground cursor-pointer no-underline",
                        isActive("/")
                          ? "bg-accent text-accent-foreground"
                          : "text-foreground/80"
                      )}
                    >
                      Home
                    </button>
                  </NavigationMenuItem>
                  <NavigationMenuItem onClick={() => router.push("/product")}>
                    <button
                      className={cn(
                        "group inline-flex h-9 w-max items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground cursor-pointer no-underline",
                        isActive("/product")
                          ? "bg-accent text-accent-foreground"
                          : "text-foreground/80"
                      )}
                    >
                      Products
                    </button>
                  </NavigationMenuItem>
                </NavigationMenuList>
              </NavigationMenu>
            )}

            {/* Search Bar - MOBILE ONLY */}
            {isMobile && (
              <div className="flex-1 max-w-md">
                <form onSubmit={handleSearchSubmit} className="w-full">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder={searchPlaceholder}
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10 pr-4 h-9 w-full"
                    />
                  </div>
                </form>
              </div>
            )}

            {/* Search Bar - DESKTOP */}
            {!isMobile && (
              <div className="relative flex flex-1 max-w-md">
                <form onSubmit={handleSearchSubmit} className="w-full">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder={searchPlaceholder}
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10 pr-4 h-9 w-full"
                    />
                  </div>
                </form>
              </div>
            )}
          </div>

          {/* Right side - Buttons */}
          <div className="flex items-center gap-1">
            <Button
              variant="ghost"
              className=" hover:bg-accent"
              onClick={(e) => {
                e.preventDefault();
                if (onSignInClick) onSignInClick();
              }}
              title="Sign In"
            >
              <p className=" hidden sm:block">Sign In</p>
              <LogIn className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </header>
    );
  }
);

SimpleNavBAr.displayName = "SimpleNavBAr";
export { Logo, HamburgerIcon };
