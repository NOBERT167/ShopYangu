"use client";
import React from "react";
import SidebarDesktop from "./SidebarDesktop";
import { useMediaQuery } from "usehooks-ts";
import SidebarMobile from "./SidebarMobile";

const Sidebar = () => {
  const isDesktop = useMediaQuery("(min-width: 640px)", {
    initializeWithValue: false,
  });
  if (isDesktop) return <SidebarDesktop />;
  return <SidebarMobile />;
};

export default Sidebar;
