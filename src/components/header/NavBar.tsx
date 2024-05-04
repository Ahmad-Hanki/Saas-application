import Link from "next/link";
import { ThemeToggle } from "../ui/Themetoggle";
import { Button } from "../ui/button";
import {
  LoginLink,
  RegisterLink,
} from "@kinde-oss/kinde-auth-nextjs/components";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import UserNav from "./UserNav";

const NavBar = async () => {
  const { getUser } = getKindeServerSession();
  const loggedIn = await getKindeServerSession().isAuthenticated();
  const user = await getUser();
  return (
    <nav className="border-b bg-background h-[10vh] flex items-center">
      <div className="container flex items-center justify-between">
        <Link href="/">
          <h1 className="font-bold text-3xl ">
            Ahmad&apos;s<span className="text-primary">Saas</span>
          </h1>
        </Link>
        <div className="flex item-center gap-x-5  ">
          <ThemeToggle />
          {loggedIn ? (
            <UserNav
              email={user?.email as string}
              name={user?.given_name as string}
              image={user?.picture as string}
            />
          ) : (
            <div className="flex items-center gap-x-5">
              <LoginLink>
                <Button>Sign In</Button>
              </LoginLink>
              <RegisterLink>
                <Button variant="secondary">Sign Up</Button>
              </RegisterLink>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
