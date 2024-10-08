"use server"

import { getUserSubscription } from "@/lib/queries";
import { stripe } from "@/lib/stripe";
import { absoluteUrl } from "@/lib/utils"
import { auth, currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

const returnUrl = absoluteUrl("/shop");
export const createStripeUrl = async() => {
    const {userId} = await auth()
    const user = await currentUser()
    if (!userId || !user){
        throw new Error("Unauthorized") && redirect("/")
    }
    const userSubscription = await getUserSubscription()
    if (userSubscription && userSubscription.stripe_customer_id){
        const stripeSession = await stripe.billingPortal.sessions.create({
            customer: userSubscription.stripe_customer_id,
            return_url: returnUrl,
        })
        return {data: stripeSession.url}
    }
    const stripeSession = await stripe.checkout.sessions.create({
        mode: "subscription",
        payment_method_types: ["card"],
        customer_email: user.emailAddresses[0].emailAddress,
        line_items:[
            {
                quantity:1,
                price_data:{
                    currency: "SGD",
                    product_data:{
                        name: "NYPTECH",
                        description: "Unlimited Hearts",
                    },
                    unit_amount: 2000,
                    recurring:{
                        interval: "month",
                    }
                }
            }
        ],
        metadata: {
            userId,
        },
        success_url: returnUrl,
        cancel_url: returnUrl,
    })
    return{ data: stripeSession.url}
}