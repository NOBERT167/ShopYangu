import { Button, ButtonProps } from "@/components/ui/button";
import React from "react";
import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface SidebarButtonProps extends ButtonProps {
  icon?: LucideIcon;
}
const SidebarButton = ({
  icon: Icon,
  children,
  className,
  ...props
}: SidebarButtonProps) => {
  return (
    <div>
      <Button
        variant="ghost"
        className={cn("gap-2 justify-start", className)}
        {...props}
      >
        {Icon && <Icon size={20} />}
        <span>{children}</span>
      </Button>
    </div>
  );
};

export default SidebarButton;
