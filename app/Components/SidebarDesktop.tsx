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

const SidebarDesktop = () => {
  return (
    <aside className="w-[270px] max-w-xs h-screen fixed left-0 top-0 z-40 border-r">
      <div className="h-full px-3 py-4">
        <div className="flex justify-between">
          <h3 className="mx-3 text-lg font-semibold text-foreground">
            ShopYangu
          </h3>
          <ModeToggle />
        </div>

        <div className="mt-5">
          <div className="flex flex-col gap-1 w-full">
            <Link href={"/"}>
              <SidebarButton className="w-full" icon={Home}>
                Home
              </SidebarButton>
            </Link>
            <Link href={"/dashboard"}>
              <SidebarButton className="w-full" icon={LayoutDashboardIcon}>
                Dashboard
              </SidebarButton>
            </Link>
            <Link href={"/products"}>
              <SidebarButton className="w-full" icon={ShoppingCartIcon}>
                Products
              </SidebarButton>
            </Link>
            <Link href={"/shops"}>
              <SidebarButton className="w-full" icon={Store}>
                Shops
              </SidebarButton>
            </Link>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default SidebarDesktop;
