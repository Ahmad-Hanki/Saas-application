"use client";
import { cn } from "@/lib/utils";
import { CreditCard, Home, Settings } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { navItem } from "./UserNav";


const DashboardNav = () => {
  const pathname = usePathname();
  return (
    <nav className="grid items-start gap-2 w-1/3">
      {navItem.map((item, i) => {
        return (
          <Link key={i} href={item.href}>
            <span
              className={cn(
                "group flex item-center rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground" , pathname == item.href ? "bg-accent" : '' 
              )}
            >
              <item.icon className="mr-2 h-4 w-4 text-primary"  />
              <span>{item.name}</span>
            </span>
          </Link>
        );
      })}
    </nav>
  );
};

export default DashboardNav;
