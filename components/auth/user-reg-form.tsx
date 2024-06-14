'use client'

import * as React from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { zodResolver } from '@hookform/resolvers/zod'
import { signIn } from 'next-auth/react'
import { useForm } from 'react-hook-form'
import * as z from 'zod'

import { cn } from '@/lib/utils'
import { userRegisterSchemaClient } from '@/lib/validation/auth'
import { Button, buttonVariants } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { toast } from '@/components/ui/use-toast'
import { LuLoader2 } from 'react-icons/lu'

type FormData = z.infer<typeof userRegisterSchemaClient>

interface UserRegFormProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string
}

export function RegForm({ className, ...props }: UserRegFormProps) {
  const formMethods = useForm<FormData>({
    resolver: zodResolver(userRegisterSchemaClient),
  })

  const [isLoading, setIsLoading] = React.useState<boolean>(false)
  const searchParams = useSearchParams()
  const router = useRouter()
  const from = searchParams?.get('from') || '/'

  async function onSubmit(data: FormData) {
    setIsLoading(true)
    console.log(data)

    const registrationResult = await fetch('/api/auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ ...data, roleId: 'user' }),
    })
    //print the Response object to the console
    const statusCode = registrationResult.status
    if (!registrationResult.ok) {
      setIsLoading(false)
      if (statusCode === 409) {
        return toast({
          title: 'Email already registered.',
          description: 'Please sign in.',
          variant: 'destructive',
        })
      } else if (statusCode === 400) {
        return toast({
          title: 'Invalid data.',
          description: 'Please try again.',
          variant: 'destructive',
        })
      } else if (statusCode === 401) {
        return toast({
          title: 'Unauthorized.',
          description: 'Incorrect role provided. Please try again.',
          variant: 'destructive',
        })
      } else {
        return toast({
          title: 'Something went wrong.',
          description: 'Please try again.',
          variant: 'destructive',
        })
      }
    }

    const signInResult = await signIn('credentials', {
      email: data.email.toLowerCase(),
      password: data.password,
      redirect: false,
      callbackUrl: from,
    })
    setIsLoading(false)

    if (signInResult?.ok === false) {
      return toast({
        title: 'Something went wrong.',
        description: 'Account created but sign in failed. Please sign in.',
        variant: 'destructive',
      })
    }

    router.refresh()
    router.push(from)
    return toast({
      title: 'Account created.',
      description: 'You are now signed in.',
    })
  }

  return (
    <div className={cn('grid gap-6', className)} {...props}>
      <Form {...formMethods}>
        <form onSubmit={formMethods.handleSubmit(onSubmit)}>
          <div className="grid gap-2">
            <div className="mb-2 grid gap-1 ">
              <FormField
                control={formMethods.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{'Name'}</FormLabel>
                    <FormControl>
                      <Input
                        id="name"
                        placeholder={'Name'}
                        type="text"
                        autoCapitalize="none"
                        required
                        disabled={isLoading}
                        {...field}
                      />
                    </FormControl>

                    {/* <FormDescription>
                      You can manage email addresses in your{" "}
                      <Link href="/examples/forms">email settings</Link>.
                    </FormDescription> */}
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={formMethods.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{'Email'}</FormLabel>
                    <FormControl>
                      <Input
                        id="email"
                        placeholder={'name@example.com'}
                        type="email"
                        autoCapitalize="none"
                        autoComplete="email"
                        autoCorrect="off"
                        required
                        disabled={isLoading}
                        {...field}
                      />
                    </FormControl>

                    {/* <FormDescription>
                      You can manage email addresses in your{" "}
                      <Link href="/examples/forms">email settings</Link>.
                    </FormDescription> */}
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={formMethods.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{'Password'}</FormLabel>
                    <FormControl>
                      <Input
                        id="password"
                        placeholder={'Password'}
                        type="password"
                        autoCapitalize="none"
                        required
                        disabled={isLoading}
                        {...field}
                      />
                    </FormControl>

                    {/* <FormDescription>
                      You can manage email addresses in your{" "}
                      <Link href="/examples/forms">email settings</Link>.
                    </FormDescription> */}
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={formMethods.control}
                name="passwordConfirmation"
                render={({ field }) => (
                  <FormItem>
                    {/* <FormLabel>Name</FormLabel> */}
                    <FormControl>
                      <Input
                        id="passwordConfirmation"
                        placeholder={'Confirm Password'}
                        type="password"
                        autoCapitalize="none"
                        required
                        disabled={isLoading}
                        {...field}
                      />
                    </FormControl>

                    {/* <FormDescription>
                      You can manage email addresses in your{" "}
                      <Link href="/examples/forms">email settings</Link>.
                    </FormDescription> */}
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <Button type="submit" className={cn(buttonVariants())} disabled={isLoading}>
              {isLoading && <LuLoader2 className="mr-2 h-4 w-4 animate-spin" />}

              {'Register'}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  )
}
