import React from "react";
import SidebarButton from "./SidebarButton";
import {
  Home,
  LayoutDashboardIcon,
  ShoppingCartIcon,
  Store,
} from "lucide-react";
import Link from "next/link";
import { ModeToggle } from "./ModeToggle";
import { usePathname } from "next/navigation";

const SidebarDesktop = () => {
  const pathname = usePathname();

  const navItems = [
    { href: "/", label: "Home", icon: Home },
    { href: "/dashboard", label: "Dashboard", icon: LayoutDashboardIcon },
    { href: "/products", label: "Products", icon: ShoppingCartIcon },
    { href: "/shops", label: "Shops", icon: Store },
  ];

  return (
    <aside className="w-[270px] bg-white dark:bg-gray-800/50 max-w-xs h-screen fixed left-0 top-0 z-40 border-r">
      <div className="h-full px-3 py-4">
        <div className="flex justify-between">
          <h3 className="mx-3 text-2xl flex font-semibold text-foreground font-roboto">
            Shop <span className="text-primary">Yangu</span>
          </h3>
          <ModeToggle />
        </div>

        <div className="mt-5">
          <div className="flex flex-col gap-1 w-full">
            {navItems.map((item) => (
              <Link key={item.href} href={item.href}>
                <SidebarButton
                  className="w-full font-montserrat"
                  icon={item.icon}
                  active={pathname === item.href}
                >
                  {item.label}
                </SidebarButton>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </aside>
  );
};

export default SidebarDesktop;
