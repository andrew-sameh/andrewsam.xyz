import { createEnv } from "@t3-oss/env-nextjs"
import { z } from "zod"

export const env = createEnv({
  server: {
    // This is optional because it's only used in development.
    // See https://next-auth.js.org/deployment.
    NEXTAUTH_URL: z.string().url(),
    NEXTAUTH_SECRET: z.string().min(1),
    NODE_ENV: z.string().refine((value) => ["development", "production"].includes(value), {
      message: "NODE_ENV must be 'development' or 'production'",
    }),
    DATABASE_URL: z.string().url().optional(),
    ADMIN_EMAIL: z.string().email().optional(),
    ADMIN_PASSWORD: z.string().min(1).optional(),
    GOOGLE_CLIENT_ID: z.string().optional(),
    GOOGLE_CLIENT_SECRET: z.string().optional(),
    GITHUB_CLIENT_ID: z.string().optional(),
    GITHUB_CLIENT_SECRET: z.string().optional(),
    AUTH_RESEND_KEY: z.string().optional(),
    AUTH_RESEND_EMAIL_DOMAIN: z.string().optional(),
    AUTH_RESEND_EMAIL_FROM: z.string().optional(),
    RESEND_TOKEN: z.string().optional(),
    RESEND_EMAIL_DOMAIN: z.string().optional(),

  },
  client: {
    NEXT_PUBLIC_APP_URL: z.string().url(),
  },
  runtimeEnv: {
    NEXTAUTH_URL: process.env.NEXTAUTH_URL,
    NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
    NODE_ENV: process.env.NODE_ENV,
    DATABASE_URL: process.env.DATABASE_URL,
    ADMIN_EMAIL: process.env.ADMIN_EMAIL,
    ADMIN_PASSWORD: process.env.ADMIN_PASSWORD,
    NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL,
    GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
    GITHUB_CLIENT_ID: process.env.GITHUB_CLIENT_ID,
    GITHUB_CLIENT_SECRET: process.env.GITHUB_CLIENT_SECRET,
    AUTH_RESEND_KEY: process.env.AUTH_RESEND_KEY,
    AUTH_RESEND_EMAIL_DOMAIN: process.env.AUTH_RESEND_EMAIL_DOMAIN,
    AUTH_RESEND_EMAIL_FROM: process.env.AUTH_RESEND_EMAIL_FROM,
    RESEND_TOKEN: process.env.RESEND_TOKEN,
    RESEND_EMAIL_DOMAIN: process.env.RESEND_EMAIL_DOMAIN,
  }, // Add a comma here
});
