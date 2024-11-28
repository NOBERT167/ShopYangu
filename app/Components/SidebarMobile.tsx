import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTrigger,
} from "@/components/ui/sheet";
import React from "react";
import { ModeToggle } from "./ModeToggle";
import {
  Home,
  LayoutDashboardIcon,
  Menu,
  ShoppingCartIcon,
  Store,
  X,
} from "lucide-react";
import Link from "next/link";
import { SidebarButtonSheet as SidebarButton } from "./SidebarButton";

const SidebarMobile = () => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button className="fixed top-3 left-3" size="icon" variant="ghost">
          <Menu size={20} />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" hideClose className="px-3 py-4">
        <SheetHeader>
          <div className="flex justify-end mb-4">
            <ModeToggle />
          </div>
          <div className="flex justify-between items-center">
            <span className="text-lg font-semibold mx-3">ShopYangu</span>
            <SheetClose asChild>
              <Button className="h-7 w-7 p-0" variant="ghost">
                <X size={15} />
              </Button>
            </SheetClose>
          </div>
        </SheetHeader>
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
      </SheetContent>
    </Sheet>
  );
};

export default SidebarMobile;
