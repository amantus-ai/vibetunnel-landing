import { Checkout } from "@polar-sh/nextjs";

export const GET = Checkout({
  accessToken: process.env.POLAR_ACCESS_TOKEN,
  successUrl: process.env.POLAR_SUCCESS_URL,
  // Remove 'server' when going to production
  // server: "sandbox", // Uncomment for testing
});