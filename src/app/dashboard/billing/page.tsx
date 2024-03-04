import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle, Loader2 } from "lucide-react";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";
import { getStripeSession } from "@/lib/stripe";
import { useFormStatus } from "react-dom";
import { StripeSubscriptionCreationButton } from "@/components/SubmitButton";
const featureItems = [
  { name: "efvw rwvwtb erterbte" },
  { name: "efvw rwvwtb erterbte" },
  { name: "efvw rwvwtb erterbte" },
  { name: "efvw rwvwtb erterbte" },
  { name: "efvw rwvwtb erterbte" },
];

async function getData(userId: string) {
    const data = await prisma?.supscription.findUnique({
      where: {
        userId: userId,
      },
      select: {
        status: true,
        user: {
          select: {
            StripeCustomerId: true

          },
        },
      },
    });
  
    return data;
  }

export default async function BillingPage() {
    const {getUser} =  getKindeServerSession();
    const user = await getUser();
    const data = await getData(user?.id as string);

    async function createSubscription () {
        'use server'

        const dbUser = await prisma?.user.findUnique({
          where: { id: user?.id },
          select : { StripeCustomerId: true }
        })


        if (!dbUser?.StripeCustomerId) {
            throw new Error('unable to get customer id'); 
        }

        const subscriptionUrl = await getStripeSession( {
            customerId: dbUser.StripeCustomerId,
            domainUrl: 'http://localhost:3000',
            priceId: process.env.STRIPE_PRICE_ID!

        })

        return redirect(subscriptionUrl);
    }

  return (
    <div className="max-w-md mx-auto space-y-4">
      <Card className="flex flex-col">
        <CardContent className="py-8">
          <div>
            <h3 className="inline-flex px-4 py-1 rounded-full text-sm font-semibold tracking-wide uppercase bg-primary/10 text-primary">
              Monthly
            </h3>
          </div>

          <div className="mt-4 flex items-baseline text-6xl font-extrabold">
            $30 <span className="ml-1 text-2xl text-muted-foreground">/mo</span>
          </div>
          <p className="mt-5 text-lg text-muted-foreground">
            Write as many notes as you want for $30 a Month
          </p>
        </CardContent>
        <div className="flex-1 flex flex-col justify-between px-6 pt-6 pb-8 bg-secondary rounded-lg m-1 space-y-6 sm:p-10 sm:pt-6">
          <ul className="space-y-4">
            {featureItems.map((item, i) => {
              return (
                <li className="flex" key={i}>
                  <div className="shrink-0">
                    <CheckCircle className="h-6 w-6 text-green-500" />
                  </div>
                  <p className="ml-3 text-base ">{item.name}</p>
                </li>
              );
            })}
          </ul>

          <form className="w-full " action={createSubscription}>
            <StripeSubscriptionCreationButton/>
          </form>
        </div>
      </Card>
    </div>
  );
}

