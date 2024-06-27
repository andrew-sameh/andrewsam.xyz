'use client'
import * as React from 'react'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { cn } from '@/lib/utils'
import useMediaQuery from '@/lib/hooks/use-media-query'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useToast } from '@/components/ui/use-toast'
import { LuSettings2 as SettingsIcon } from 'react-icons/lu'
import { LuLoader2 } from 'react-icons/lu'
import { useAtom } from 'jotai'
import { salarySettingsAtom } from '@/components/atoms/toolsAtoms' // Import the atom

export type SettingsValue = {
  adjustment: number
  increase: number
}
export function CalculatorSettingsDrawer() {
  const [open, setOpen] = React.useState(false)
  const media = useMediaQuery()

  if (media.isDesktop) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button variant="outline" size="icon">
            <SettingsIcon className="h-4 w-4" />
            <span className="sr-only">Calculator Settings</span>
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Calculator Settings</DialogTitle>
            <DialogDescription>
              Make changes to the adjustment rate, and test increase rate.
            </DialogDescription>
          </DialogHeader>
          <SettingsForm setOpen={setOpen} />
        </DialogContent>
      </Dialog>
    )
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button variant="outline" size="icon">
          <SettingsIcon className="h-4 w-4" />
          <span className="sr-only">Calculator Settings</span>
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader className="text-left">
          <DrawerTitle>Calculator Settings</DrawerTitle>
          <DrawerDescription>
            Make changes to the adjustment rate, and test increase rate.
          </DrawerDescription>
        </DrawerHeader>
        <SettingsForm className="px-4" setOpen={setOpen} />
        <DrawerFooter className="pt-2">
          <DrawerClose asChild>
            <Button variant="outline">Cancel</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}

const formSchema = z.object({
  adjustment: z.coerce.number(),
  increase: z.coerce.number(),
})

type FormData = z.infer<typeof formSchema>

function SettingsForm({
  className,
  setOpen,
}: React.ComponentProps<'form'> & { setOpen: (open: boolean) => void }) {
  const { toast } = useToast()
  const [salarySettings, setSalarySetting] = useAtom(salarySettingsAtom)

  const [isLoading, setIsLoading] = React.useState<boolean>(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      adjustment: salarySettings.adjustment,
      increase: salarySettings.increase,
    },
  })

  // 2. Define a submit handler.
  async function onSubmit(values: FormData) {
    setIsLoading(true)
    const { adjustment = 0, increase = 0 } = values // Provide default values
    setSalarySetting({ adjustment, increase })
    toast({
      description: `${values.adjustment} adjustment rate and ${values.increase} increase rate saved.`,
    })
    setIsLoading(false)
    setOpen(false) // Close the dialog
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className={cn('grid items-start gap-4', className)}
      >
        <div className="grid gap-2">
          <FormField
            control={form.control}
            name="adjustment"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Adjustment Rate %</FormLabel>
                <FormControl>
                  <Input type="number" {...field} />
                </FormControl>
                {/* <FormDescription>Gross salary amount.</FormDescription> */}
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="grid gap-2">
          <FormField
            control={form.control}
            name="increase"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Virtual Increase %</FormLabel>
                <FormControl>
                  <Input type="number" {...field} />
                </FormControl>
                {/* <FormDescription>Gross salary amount.</FormDescription> */}
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Button
          type="submit"
          disabled={isLoading}
          variant={'outline'}
          className="sm:mx-auto sm:w-56"
        >
          {isLoading && <LuLoader2 className="me-2 h-4 w-4 animate-spin" />}
          Save changes
        </Button>
      </form>
    </Form>
  )
}
