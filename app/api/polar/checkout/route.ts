import { Checkout } from "@polar-sh/nextjs";

// Ensure environment variables are available
if (!process.env.POLAR_ACCESS_TOKEN || !process.env.POLAR_SUCCESS_URL) {
  throw new Error("Missing required environment variables: POLAR_ACCESS_TOKEN and/or POLAR_SUCCESS_URL");
}

export const GET = Checkout({
  accessToken: process.env.POLAR_ACCESS_TOKEN,
  successUrl: process.env.POLAR_SUCCESS_URL,
});