import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

import { CreditCard, DoorClosed, Home, Settings } from "lucide-react";
import { LogoutLink } from "@kinde-oss/kinde-auth-nextjs/components";

export const navItem = [
  { name: "Home", href: "/dashboard", icon: Home },
  { name: "Settings", href: "/dashboard/settings", icon: Settings },
  { name: "Billing", href: "/dashboard/billing", icon: CreditCard },
];

type UserProps = {
  name:string,
  email:string,
  image :string
}

const UserNav = ({name, email, image}:UserProps) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-10 w-10 rounded-full">
          <Avatar className="h-10 w-10 rounded-full">
            <AvatarImage src={image} alt="" />
            <AvatarFallback>{name}</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel>
          <div className="flex flex-col space-y-1 ">
            <p className="text-sm font-medium leading-none">{name}</p>
            <p className="text-xs leading-none text-muted-foreground">
              {email}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          {navItem.map((item, i) => {
            return (
              <DropdownMenuItem asChild key={i}>
                <Link
                  className="w-full flex justify-between items-center"
                  href={item.href}
                >
                  {item.name}
                  <span>
                    <item.icon className="w-4 h-4 " />
                  </span>
                </Link>
              </DropdownMenuItem>
            );
          })}
        </DropdownMenuGroup>
        <DropdownMenuShortcut />
        <DropdownMenuItem
          className="w-full flex justify-between items-center"
          asChild
        >
          <LogoutLink>
            Logout{" "}
            <span>
              <DoorClosed className="w-w h-4" />
            </span>
          </LogoutLink>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserNav;
