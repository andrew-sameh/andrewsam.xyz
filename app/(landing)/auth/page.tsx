import { Suspense } from "react";

import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { LuChevronLeft } from "react-icons/lu";

import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import SiteLogo from "@/components/SiteLogos";
import { UserAuthForm } from "@/components/auth/user-auth-form";
// export const metadata: Metadata = {
//   title: "Login",
//   description: "Login to your account",
// };

export default function LoginPage() {
  return (
    <div className="flex items-center justify-center mt-20  md:mt-20 lg:mt-20 xl:mt-10 2xl:mt-40  ">
      {/* <Link
        href="/"
        className={cn(
          buttonVariants({ variant: "ghost" }),
          "absolute left-4 top-24 md:left-8 md:top-28",
        )}
      >
        <>
          <LuChevronLeft className="mr-2 h-4 w-4" />
          Back
        </>
      </Link> */}
      <div className="mx-auto my-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px] px-2">
        <div className="flex flex-col content-center justify-center space-y-2 text-center">

          <SiteLogo kind="logo" logoType="image" className="mx-auto h-12 w-12" />

          <h1 className="text-2xl font-semibold tracking-tight">
            Welcome back
          </h1>
          <p className="text-sm">
            Enter your email to sign in to your account
          </p>
        </div>
        <Suspense>
          <UserAuthForm />
        </Suspense>

        <p className="px-8 text-center text-sm text-muted-foreground">
          {/* <Link
            href="/register"
            className="hover:text-brand underline underline-offset-4"
          >
            Don&apos;t have an account? Sign Up
          </Link> */}
        </p>
      </div>
    </div>
  );
}
