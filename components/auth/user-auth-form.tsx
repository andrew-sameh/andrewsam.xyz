'use client'

import * as React from 'react'
import { useSearchParams } from 'next/navigation'
import { zodResolver } from '@hookform/resolvers/zod'
import { signIn } from 'next-auth/react'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import { useRouter, usePathname } from 'next/navigation'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

import { cn } from '@/lib/utils'
import { buttonVariants } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { toast } from '@/components/ui/use-toast'
// import { Icons } from "@/components/shared/icons-bundle";
import { FcGoogle } from 'react-icons/fc'
import { FaGithub } from 'react-icons/fa'

import { LuLoader2 } from 'react-icons/lu'
import Link from 'next/link'
export const userAuthSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
})

export const userAuthSchemaEmail = z.object({
  email: z.string().email(),
})

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}

type FormData = z.infer<typeof userAuthSchema>
type FormDataEmail = z.infer<typeof userAuthSchemaEmail>

export function UserAuthForm({ className, ...props }: UserAuthFormProps) {
  const router = useRouter()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(userAuthSchema),
  })
  const {
    register: registerEmail,
    handleSubmit: handleSubmitEmail,
    formState: { errors: errorsEmail },
  } = useForm<FormDataEmail>({
    resolver: zodResolver(userAuthSchemaEmail),
  })
  const [isLoading, setIsLoading] = React.useState<boolean>(false)
  const [isLoadingEmail, setIsLoadingEmail] = React.useState<boolean>(false)
  const [isGitHubLoading, setIsGitHubLoading] = React.useState<boolean>(false)
  const [isGoogleLoading, setIsGoogleLoading] = React.useState<boolean>(false)
  const searchParams = useSearchParams()
  const from = searchParams?.get('from') || '/'

  async function onSubmit(data: FormData) {
    setIsLoading(true)

    const signInResult = await signIn('credentials', {
      email: data.email.toLowerCase(),
      password: data.password,
      redirect: false,
      callbackUrl: from,
    })
    console.log(signInResult)

    setIsLoading(false)

    if (signInResult?.ok === false) {
      return toast({
        title: 'Something went wrong.',
        description: 'Your sign in request failed. Please try again.',
        variant: 'destructive',
      })
    }

    router.refresh()
    router.push(from)
    return toast({
      title: `Success! ${from}`,
      description: 'You are now signed in.',
    })
  }
  async function onSubmitEmail(data: FormDataEmail) {
    setIsLoadingEmail(true)
    const signInResult = await signIn('resend', {
      email: data.email.toLowerCase(),
      redirect: false,
      callbackUrl: from,
    })
    const statusCode = signInResult?.status
    if (statusCode !== 200) {
      setIsLoadingEmail(false)
      return toast({
        title: `Something went wrong.`,
        description: 'Your sign in request failed. Please try again.',
        variant: 'destructive',
      })
    }
    router.push(`/auth/verify?email=${data.email.toLowerCase()}&from=${from}`)

    setIsLoadingEmail(false)
  }

  return (
    <div className={cn('grid gap-6', className)} {...props}>
      <Tabs
        defaultValue="email"
        //  className="w-[400px]"
      >
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="email">Email</TabsTrigger>
          <TabsTrigger value="credentials">Credentials</TabsTrigger>
        </TabsList>
        <TabsContent value="email">
          <form onSubmit={handleSubmitEmail(onSubmitEmail)}>
            <div className="grid gap-2">
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
                  disabled={isLoadingEmail}
                  {...registerEmail('email')}
                />
                {errorsEmail?.email && (
                  <p className="px-1 text-xs text-red-400">{errorsEmail.email.message}</p>
                )}
              </div>
              <button
                className={cn(buttonVariants())}
                disabled={isLoadingEmail || isLoading || isGitHubLoading || isGoogleLoading}
              >
                {isLoadingEmail && <LuLoader2 className="mr-2 h-4 w-4 animate-spin" />}
                Sign In
              </button>
            </div>
          </form>
        </TabsContent>
        <TabsContent value="credentials">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="grid gap-2">
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
                  {...register('email')}
                />
                <Input
                  id="password"
                  type="password"
                  placeholder="Password"
                  disabled={isLoading}
                  {...register('password')}
                />
                {errors?.email && (
                  <p className="px-1 text-xs text-red-400">{errors.email.message}</p>
                )}
                {errors?.password && (
                  <p className="px-1 text-xs text-red-400">{errors.password.message}</p>
                )}
              </div>
              <div className="grid grid-cols-4 gap-2">
                <button
                  className={cn(buttonVariants(), 'col-span-3')}
                  disabled={isLoadingEmail || isLoading || isGitHubLoading || isGoogleLoading}
                >
                  {isLoading && <LuLoader2 className="mr-2 h-4 w-4 animate-spin" />}
                  Sign In
                </button>
                <Link href="/auth/register" className="col-span-1">
                  <button className={cn(buttonVariants(), ' w-full')}>Register</button>
                </Link>
              </div>
            </div>
          </form>
        </TabsContent>
      </Tabs>

      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">Or continue with</span>
        </div>
      </div>
      <button
        type="button"
        className={cn(buttonVariants({ variant: 'outline' }))}
        onClick={() => {
          setIsGitHubLoading(true)
          signIn('github', {
            callbackUrl: from,
          })
        }}
        disabled={isLoadingEmail || isLoading || isGitHubLoading || isGoogleLoading}
      >
        {isGitHubLoading ? (
          <LuLoader2 className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          <FaGithub className="mr-2 h-4 w-4" />
        )}{' '}
        Github
      </button>
      <button
        type="button"
        className={cn(buttonVariants({ variant: 'outline' }))}
        onClick={() => {
          setIsGoogleLoading(true)
          signIn('google', {
            callbackUrl: from,
          })
        }}
        disabled={isLoadingEmail || isLoading || isGitHubLoading || isGoogleLoading}
      >
        {isGoogleLoading ? (
          <LuLoader2 className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          <FcGoogle className="mr-2 h-4 w-4" />
        )}{' '}
        Google
      </button>
    </div>
  )
}
