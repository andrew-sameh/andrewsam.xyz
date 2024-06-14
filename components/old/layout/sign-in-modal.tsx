"use client";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { signIn } from "next-auth/react";
import { useState } from "react";
import { LoadingDots } from "@/components/shared/icons";
import Image from "next/image";

import * as React from "react";
import { useSearchParams } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { useRouter } from "next/navigation";

import { buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { LuChevronRight } from "react-icons/lu";

export const userAuthSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

type FormData = z.infer<typeof userAuthSchema>;

export default function SignInModal({}: {}) {
  const [signInClicked, setSignInClicked] = useState(false);
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(userAuthSchema),
  });
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  // const [isGitHubLoading, setIsGitHubLoading] = React.useState<boolean>(false)
  const searchParams = useSearchParams();
  async function onSubmit(data: FormData) {
    setIsLoading(true);
    setSignInClicked(true);

    const signInResult = await signIn("credentials", {
      email: data.email.toLowerCase(),
      password: data.password,
      redirect: false,
      callbackUrl: searchParams?.get("from") || "/",
    });

    setIsLoading(false);
    setSignInClicked(false);

    if (!signInResult?.ok) {
      return toast({
        title: "Something went wrong.",
        description: "Your sign in request failed. Please try again.",
        variant: "destructive",
      });
    }

    const from = searchParams?.get("from");
    const redirectUrl = from ? `${from}` : ``;
    router.push(redirectUrl);
    return toast({
      title: "Success!",
      description: "You are now signed in.",
    });
  }
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="rounded-full border border-black bg-black p-1.5 px-4 text-sm text-white transition-all hover:bg-white hover:text-black">
          <LuChevronRight className="mr-2 h-4 w-4" /> Sign In
        </Button>
      </DialogTrigger>
      <DialogContent className="p-0 rounded-lg">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col items-center justify-center space-y-3 border-b border-gray-200 bg-white px-4 py-6 pt-8 text-center dark:border-gray-700 dark:bg-zinc-800 md:px-16">
            <div className="grid w-64 gap-2">
              <Image
                src="/logo.png"
                alt="Precedent logo"
                width="50"
                height="50"
                className="mx-auto rounded-sm"
              ></Image>

              <h1 className="text-2xl font-semibold tracking-tight">
                Welcome back
              </h1>
              <p className="text-sm">
                Enter your email and password to sign in to your account
              </p>
              <div className="grid gap-1">
                <Label className="sr-only" htmlFor="email">
                  Email
                </Label>
                <Input
                  id="email"
                  placeholder="name@example.com"
                  type="email"
                  autoCapitalize="none"
                  autoComplete="email"
                  autoCorrect="off"
                  disabled={isLoading}
                  {...register("email")}
                />
                <Input
                  id="password"
                  type="password"
                  placeholder="Password"
                  disabled={isLoading}
                  {...register("password")}
                />
                {errors?.email && (
                  <p className="px-1 text-xs text-red-400">
                    {errors.email.message}
                  </p>
                )}
                {errors?.password && (
                  <p className="px-1 text-xs text-red-400">
                    {errors.password.message}
                  </p>
                )}
              </div>
              {/* <button className={cn(buttonVariants())} disabled={isLoading}>
                {isLoading && (
                  <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                )}
                Sign In
              </button> */}
            </div>
          </div>

          <div className="flex flex-col space-y-4 bg-gray-50 px-4 py-8  dark:bg-zinc-900 md:px-16">
            <button
              disabled={signInClicked}
              className={`${
                signInClicked
                  ? "cursor-not-allowed border-gray-200 bg-gray-100 dark:border-zinc-700 dark:bg-zinc-800 "
                  : "border border-gray-200 bg-white hover:bg-gray-50 dark:border-gray-700 dark:bg-zinc-800 "
              } flex h-10 w-full items-center justify-center space-x-3 rounded-md border text-sm shadow-sm transition-all duration-75 focus:outline-none`}
            >
              {signInClicked ? (
                <LoadingDots color="#808080" />
              ) : (
                <>
                  <p>Sign In</p>
                </>
              )}
            </button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
