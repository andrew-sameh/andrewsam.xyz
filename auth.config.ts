import type { NextAuthConfig } from "next-auth"

import { db } from "@/lib/prisma";
import {MagicLinkEmail} from "@/emails/email-auth-template";
import { render } from '@react-email/render';
import Google from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials"
import GitHub from "next-auth/providers/github";
import Resend from "next-auth/providers/resend";

import { env } from "@/env.mjs";
import bcrypt from "bcryptjs";

// Notice this is only an object, not a full Auth.js instance
export default {
    providers: [
      GitHub({
        clientId: env.GITHUB_CLIENT_ID,
        clientSecret: env.GITHUB_CLIENT_SECRET,
      }),
      Google({
        clientId: env.GOOGLE_CLIENT_ID,
        clientSecret: env.GOOGLE_CLIENT_SECRET,
        authorization: {
          params: {
            prompt: "consent",
            access_type: "offline",
            response_type: "code"
          }
        },
      }),
    //   Resend({
    //     from: env.AUTH_RESEND_EMAIL_FROM,
    //     apiKey: env.AUTH_RESEND_KEY,
    //     sendVerificationRequest: async ({ identifier: email, url, provider, theme }) => {
    //       const { host } = new URL(url)
    //       await fetch("https://api.resend.com/emails", {
    //         method: "POST",
    //         headers: {
    //           Authorization: `Bearer ${provider.apiKey}`,
    //           "Content-Type": "application/json",
    //         },
    //         body: JSON.stringify({
    //           from: provider.from,
    //           to: email,
    //           subject: `Sign in to ${host}`,
    //           html: render(MagicLinkEmail({ loginUrl: url })),
    //           text: render(MagicLinkEmail({ loginUrl: url }), { plainText: true }),
    //         }),
    //       })
    //     },
    //   }),
      Credentials({
        type: "credentials",
        credentials: {
          email: { label: "Email", type: "text" },
          password: { label: "Password", type: "password" },
        },
        async authorize(credentials) {
          const { email, password } = credentials as {
            email: string;
            password: string;
          };
  
          if (!email || !password) return null;
  
          const user = await db.user.findUnique({
            where: { email: email },
          });
  
          if (user && bcrypt.compareSync(password, user.password ?? "")) {
            return user;
          } else {
            throw new Error("invalid credentials");
          }
          // }
        },
      }),
    ],
    pages: {
      signIn: "/auth",
      error: "/auth/error", // Error code passed in query string as ?error=
      verifyRequest: "/auth/verify", // (used for check email message) 
    },
    callbacks: {
      async redirect({ url, baseUrl }) {
        // Allows relative callback URLs
        if (url.startsWith("/")) return `${baseUrl}${url}`
        // Allows callback URLs on the same origin
        else if (new URL(url).origin === baseUrl) return url
        return baseUrl
      },
    },
  } satisfies NextAuthConfig