import Stripe from 'stripe';

import React from 'react'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion : '2023-10-16',
    typescript: true,

});

export const getStripeSession = async ({
    priceId, domainUrl, customerId
}: StripeType) => {
    const session = await stripe.checkout.sessions.create({
        customer: customerId,
        mode: 'subscription',
        billing_address_collection: 'auto',
        line_items : [{price: priceId, quantity: 1}],
        payment_method_types:['card'],
        customer_update: {
            address: 'auto',
            name:'auto',
        },
        success_url: `${domainUrl}/payment/success`,
        cancel_url: `${domainUrl}/payment/cancelled`,
    })
    return session.url as string
}

export default stripe