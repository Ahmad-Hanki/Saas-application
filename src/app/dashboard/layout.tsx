import DashboardNav from "@/components/header/DashboardNav";
import { ReactNode } from "react";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";
type Props = {
  children: ReactNode;
};

async function getData ({email, id, firstname, lastname, profileImage }) {

}


const DashboardLayout = async ({ children }: Props) => {
    const {isAuthenticated} = getKindeServerSession();
    const isLoggedIn = await isAuthenticated(); 
    if (!isLoggedIn) {
        return redirect('/');
    }
  return (
    <div className="flex flex-col space-y-6 mt-10">
      <div className="container grid flex-1 gap-12 md:grid-cols-[200px_1fr]">
        <aside className="hidden w-[200px] flex-col md:flex ">
          <h1>hello</h1>
        </aside>
        <main>
          <DashboardNav />
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
