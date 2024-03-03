import DashboardNav from "@/components/header/DashboardNav";
import { ReactNode } from "react";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";
import prisma from "../../../prisma/client";
type Props = {
  children: ReactNode;
};

async function getData({
  email,
  id,
  firstname,
  lastname,
  profileImage,
}: UserInfo) {
  const user = await prisma.user.findUnique({
    where: {
      id: id,
      
    },
    select: {
      id: true,
      StripeCustomerId: true,
    },
  });

  if (!user) {

    await prisma.user.create({
      data: {
        id: id,
        email: email,
        name: firstname + " " + lastname,
      },
    });
  }
}

const DashboardLayout = async ({ children }: Props) => {
  const { getUser } = getKindeServerSession();
  const userData = await getUser();
  if (!userData) {
    return redirect("/");
  }

  await getData({
    email: userData.email as string,
    id: userData.id as string,
    firstname: userData.given_name as string,
    lastname: userData.family_name as string,
    profileImage: userData.picture,
  });

  return (
    <div className="flex flex-col space-y-6 mt-10">
      <div className="container grid flex-1 gap-12 md:grid-cols-[200px_1fr]">
        <aside className="hidden w-[200px] flex-col md:flex ">
          <h1>hello</h1>
        </aside>
        <main className="flex justify-start gap-10">
          <DashboardNav/>
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
