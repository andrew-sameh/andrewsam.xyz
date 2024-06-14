import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { db } from "@/lib/prisma";
import authConfig from "@/auth.config"
import Resend from "next-auth/providers/resend";
import {VerifyUserEmailTemplate} from "@/emails/verify-user-template";
import { render } from '@react-email/render';
import { env } from "@/env.mjs";

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(db),
  session: { strategy: "jwt" },
  providers: [
    Resend({
      from: env.AUTH_RESEND_EMAIL_FROM,
      apiKey: env.AUTH_RESEND_KEY,
      sendVerificationRequest: async ({ identifier: email, url, provider, theme }) => {
        const { host } = new URL(url)
        await fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${provider.apiKey}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            from: provider.from,
            to: email,
            subject: `Verify Email for Andrew Sam`,
            html: render(VerifyUserEmailTemplate({ inviteLink: url })),
            text: render(VerifyUserEmailTemplate({ inviteLink: url }), { plainText: true }),
          }),
        })
      },
    }),
    ...(authConfig.providers || []),

  ],
  ...authConfig.pages,
  ...authConfig.callbacks,
});
