"use client";
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
        <Button
          className="fixed flex justify-start top-0 pl-5 left-0 w-full rounded-none bg-white dark:bg-slate-700"
          size="icon"
          variant="ghost"
        >
          <Menu size={20} />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" hideClose className="px-3 py-4">
        <SheetHeader>
          <div className="flex justify-end mb-4">
            <ModeToggle />
          </div>
          <div className="flex justify-between items-center">
            <h3 className="mx-3 text-2xl flex font-semibold text-foreground font-roboto">
              Shop <span className="text-primary">Yangu</span>
            </h3>
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
              <SidebarButton className="w-full font-montserrat" icon={Home}>
                Home
              </SidebarButton>
            </Link>
            <Link href={"/dashboard"}>
              <SidebarButton
                className="w-full font-montserrat"
                icon={LayoutDashboardIcon}
              >
                Dashboard
              </SidebarButton>
            </Link>
            <Link href={"/products"}>
              <SidebarButton
                className="w-full font-montserrat"
                icon={ShoppingCartIcon}
              >
                Products
              </SidebarButton>
            </Link>
            <Link href={"/shops"}>
              <SidebarButton className="w-full font-montserrat" icon={Store}>
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
