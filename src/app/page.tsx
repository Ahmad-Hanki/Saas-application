import { Button } from "@/components/ui/button";
import { RegisterLink } from "@kinde-oss/kinde-auth-nextjs/components";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";
import { motion } from "framer-motion";
export default async function Home() {
  const { isAuthenticated } = getKindeServerSession();
  const isLoggedIn = await isAuthenticated();
  if (isLoggedIn) return redirect("/dashboard");
  return (
    <main>
      <section className="flex justify-center items-center bg-background h-[90vh] ">
        <div className="relative items-center w-full px-5 py-12 mx-auto lg:px-16 max-w-7xl md:px-12 ">
          <div className="max-w-3xl mx-auto text-center">
            <div>
              <span className="w-auto px-6 py-3 rounded-full bg-secondary">
                <span
              
                >
                  Sort Your Notes easily
                </span>
              </span>
              <h1 className="mt-8 text-3xl font-extrabold tracking-tight lg:text-6xl">
                Create Notes with Ease
              </h1>
              <p className="max-w-xl mx-auto mt-8 text-base lg:text-xl text-secondary-foreground">
                elit. Voluptatum libero earum quis recusandae, est numquam!
                Magnam quod aperiam quasi laudantium provident possimus tenetur
                nostrum sint, dolorum nesciunt accusamus natus facilis.
              </p>
            </div>
            <div className="flex justify-center max-w-sm mx-auto mt-10">
              <RegisterLink>
                <Button size="lg" className="w-full">
                  Sign Up For Free
                </Button>
              </RegisterLink>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
