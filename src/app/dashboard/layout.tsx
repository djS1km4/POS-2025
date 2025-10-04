'use client';

import Link from "next/link";
import { usePathname, redirect } from "next/navigation";
import React, { useEffect, useRef, useState, useContext } from "react";
import {
  BarChart,
  Boxes,
  ClipboardList,
  LayoutDashboard,
  MonitorSmartphone,
  Settings,
  Package,
  MessageCircle,
  Palette,
  Moon,
  Sun,
  Loader2,
} from "lucide-react";

import { Logo } from "@/components/logo";
import { UserNav } from "@/components/user-nav";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import { cn } from "@/lib/utils";
import { UserContext } from "@/context/user-context";
import { useTheme } from "@/context/theme-context";

const allNavItems = [
  { href: "/dashboard", icon: LayoutDashboard, label: "Panel", roles: ['Administrador', 'Mesero', 'Vendedor', 'Bartender', 'Cajero'] },
  { href: "/dashboard/pos", icon: MonitorSmartphone, label: "Punto de Venta", roles: ['Administrador', 'Mesero', 'Vendedor', 'Bartender', 'Cajero'] },
  { href: "/dashboard/orders", icon: ClipboardList, label: "Pedidos", roles: ['Administrador', 'Mesero', 'Vendedor', 'Bartender', 'Cajero'] },
  { href: "/dashboard/inventory", icon: Boxes, label: "Inventario", roles: ['Administrador'] },
  { href: "/dashboard/reports", icon: BarChart, label: "Reportes", roles: ['Administrador'] },
  { href: "/dashboard/integrations", icon: Package, label: "Integraciones", roles: ['Administrador'] },
  { href: "/dashboard/whatsapp", icon: MessageCircle, label: "WhatsApp", roles: ['Administrador', 'Mesero', 'Vendedor', 'Bartender', 'Cajero'] },
  { href: "/dashboard/settings", icon: Settings, label: "Configuración", roles: ['Administrador'] },
];

function DashboardNav() {
  const pathname = usePathname();
  const navRef = useRef<HTMLElement>(null);
  const [indicatorStyle, setIndicatorStyle] = useState({ width: 0, left: 0, opacity: 0 });
  const { currentUser } = useContext(UserContext)!;

  const navItems = allNavItems.filter(item => currentUser?.role && item.roles.includes(currentUser.role));

  const isNavItemActive = (href: string) => {
    if (href === '/dashboard') {
      return pathname === href;
    }
    return pathname.startsWith(href);
  };

  useEffect(() => {
    // We need a slight delay to ensure the DOM is fully updated after role change
    setTimeout(() => {
      const activeLink = navRef.current?.querySelector<HTMLAnchorElement>('[data-active="true"]');
      if (activeLink) {
          setIndicatorStyle({
              width: activeLink.offsetWidth,
              left: activeLink.offsetLeft,
              opacity: 1,
          });
      } else {
        // If no active link is found (e.g., on a restricted page), hide the indicator
        setIndicatorStyle({ width: 0, left: 0, opacity: 0 });
      }
    }, 50);
  }, [pathname, navItems]);

  return (
    <nav ref={navRef} className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-4 bg-muted p-1 rounded-full relative">
      <div 
        className="absolute h-[calc(100%-0.5rem)] bg-background shadow-sm rounded-full transition-all duration-300 ease-in-out"
        style={indicatorStyle}
      />
      {navItems.map((item) => {
          const isActive = isNavItemActive(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              data-active={isActive}
              className={cn(
                "transition-all px-3 py-1.5 rounded-full text-xs font-medium z-10 flex items-center gap-2 whitespace-nowrap",
                isActive
                  ? "text-foreground"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              <item.icon className="h-4 w-4" />
              {item.label}
            </Link>
          );
      })}
    </nav>
  );
}

function ThemeToggle() {
    const { theme, setTheme } = useTheme();

    return (
        <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className="rounded-full"
        >
            <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            <span className="sr-only">Toggle theme</span>
        </Button>
    );
}


export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const userContext = useContext(UserContext);
  const pathname = usePathname();

  if (!userContext) {
    // This case should ideally not happen if providers are set up correctly
    return <div className="flex h-screen w-full items-center justify-center">Initializing context...</div>;
  }
  
  const { currentUser, isInitialized } = userContext;

  useEffect(() => {
    // Redirect to login if initialization is complete and there's no user
    if (isInitialized && !currentUser) {
      redirect('/login');
    }
  }, [isInitialized, currentUser]);

  const navItems = currentUser ? allNavItems.filter(item => item.roles.includes(currentUser.role)) : [];
  
  const isNavItemActive = (href: string) => {
    if (href === '/dashboard') {
      return pathname === href;
    }
    return pathname.startsWith(href);
  };


  // Show a loading screen while initializing or if user data isn't ready post-auth
  if (!isInitialized || !currentUser) {
    return (
        <div className="flex h-screen w-full items-center justify-center">
            <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
        </div>
    );
  }

  return (
      <div className="flex min-h-screen w-full flex-col">
        <header className="sticky top-0 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6 z-20">
          <Link
            href="/dashboard"
            className="flex items-center gap-2 text-lg font-semibold md:text-base mr-4"
          >
            <Logo />
          </Link>
          <DashboardNav />
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="shrink-0 md:hidden"
              >
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left">
              <nav className="grid gap-6 text-lg font-medium">
                <Link
                  href="#"
                  className="flex items-center gap-2 text-lg font-semibold"
                >
                  <Logo />
                </Link>
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      "flex items-center gap-3 hover:text-foreground",
                    isNavItemActive(item.href)
                    ? 'text-foreground'
                    : 'text-muted-foreground'
                    )}
                  >
                    <item.icon className="h-5 w-5" />
                    {item.label}
                  </Link>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
          <div className="flex w-full items-center gap-4 md:ml-auto md:gap-2 lg:gap-4">
              <div className="ml-auto flex items-center gap-2">
                <ThemeToggle />
                <UserNav />
              </div>
          </div>
        </header>
        <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
          {children}
        </main>
      </div>
  );
}
