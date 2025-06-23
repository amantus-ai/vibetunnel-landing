import { Webhooks } from "@polar-sh/nextjs";

export const POST = Webhooks({
  webhookSecret: process.env.POLAR_WEBHOOK_SECRET!,
  onPayload: async (payload) => {
    // Handle all webhook events
    console.log("Received Polar webhook:", payload.type);
    
    switch (payload.type) {
      case "checkout.created":
        console.log("Checkout created:", payload.data);
        break;
      case "checkout.succeeded":
        console.log("Checkout succeeded:", payload.data);
        // You could send a thank you email here
        break;
      case "subscription.created":
        console.log("New subscription:", payload.data);
        break;
      case "subscription.cancelled":
        console.log("Subscription cancelled:", payload.data);
        break;
      case "customer.created":
        console.log("New customer:", payload.data);
        break;
      case "customer.updated":
        console.log("Customer updated:", payload.data);
        break;
      default:
        console.log("Unhandled webhook type:", payload.type);
    }
  },
  // Optional: Use granular handlers instead of onPayload
  // onCheckoutCreated: async (payload) => {
  //   console.log("Checkout created:", payload);
  // },
  // onCheckoutSucceeded: async (payload) => {
  //   console.log("Checkout succeeded:", payload);
  // },
  // onSubscriptionCreated: async (payload) => {
  //   console.log("Subscription created:", payload);
  // },
});