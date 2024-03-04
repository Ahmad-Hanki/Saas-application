import { headers } from "next/headers";


export const POST = async (req:Request) => {
    const body = await req.text();
    const signature = headers().get('Stipe-Signature');
    let event: Stripe.Event
}
