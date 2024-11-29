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
      {/* <div className="absolute inset-0 -z-10 h-full w-full bg-white bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:6rem_4rem]">
        <div className="absolute bottom-0 left-0 right-0 top-0 bg-[radial-gradient(circle_800px_at_100%_200px,#d5c5ff,transparent)]"></div>
      </div> */}
      {/* <div className="relative h-full w-full bg-slate-950">
        <div className="absolute bottom-0 left-[-20%] right-0 top-[-10%] h-[500px] w-[500px] rounded-full bg-[radial-gradient(circle_farthest-side,rgba(255,0,182,.15),rgba(255,255,255,0))]"></div>
        <div className="absolute bottom-0 right-[-20%] top-[-10%] h-[500px] w-[500px] rounded-full bg-[radial-gradient(circle_farthest-side,rgba(255,0,182,.15),rgba(255,255,255,0))]"></div>
      </div> */}
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
