import { Suspense } from 'react'

import { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { LuChevronLeft } from 'react-icons/lu'

import { cn } from '@/lib/utils'
import { buttonVariants } from '@/components/ui/button'
// import { Icons } from "@/components/shared/icons-bundle";
import { RegForm } from '@/components/auth/user-reg-form'
// export const metadata: Metadata = {
//   title: "Login",
//   description: "Login to your account",
// };

export default function CredentialsRegisterPage() {
  return (
    <div className="mt-20 flex items-center justify-center  md:mt-20 lg:mt-20 xl:mt-10 2xl:mt-40  ">
      <div className="mx-auto my-auto flex w-full flex-col justify-center space-y-6 px-2 sm:w-[350px]">
        <div className="flex flex-col content-center justify-center space-y-2 text-center">
          {/* <Logo className="mx-auto h-6 w-6" /> */}
          <Image
            src="/logo.png"
            alt="Andrew Sam"
            width="50"
            height="50"
            className="mx-auto rounded-sm"
          ></Image>

          <h1 className="text-2xl font-semibold tracking-tight">Create an account</h1>
          {/* <p className="text-sm">
            Enter your email and password to sign in to your account
          </p> */}
          <Link href="/auth" className={cn(buttonVariants({ variant: 'ghost' }))}>
            <>
              <LuChevronLeft className="mr-2 h-4 w-4" />
              Login
            </>
          </Link>
        </div>
        <Suspense>
          <RegForm />
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
  )
}
