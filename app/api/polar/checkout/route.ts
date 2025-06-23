import { Checkout } from "@polar-sh/nextjs";

export const GET = Checkout({
  accessToken: process.env.POLAR_ACCESS_TOKEN!,
  successUrl: process.env.POLAR_SUCCESS_URL || "https://vibetunnel.sh/thank-you",
  // Remove 'server' in production, or set to 'production'
  // server: "sandbox", // Uncomment for testing
});