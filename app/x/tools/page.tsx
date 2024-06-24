import { Shell, ShellHeader, DashedShellContainer, ShellContainer } from '@/components/x/Shell'
import { genPageMetadata } from 'app/seo'
import { Button } from '@/components/ui/button'
import { Card, CardFooter, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
export const metadata = genPageMetadata({ title: 'Tools' })
import { FcMoneyTransfer } from 'react-icons/fc'

import Link from 'next/link'
export default function XPage() {
  return (
    <Shell className="">
      <ShellHeader heading="Pizza Section" />
      <ShellContainer>
        <div className="grid grid-cols-2 gap-5 md:grid-cols-4 lg:grid-cols-6">
          <Link href="/x/tools/calc">
            <Card className="flex flex-col items-center justify-end text-center transition duration-300 hover:scale-105 sm:col-span-1">
              <CardHeader className="pb-6 ">
                <CardTitle>Income Calculator</CardTitle>
              </CardHeader>
              <CardContent>
                <FcMoneyTransfer className="h-14 w-14" />
              </CardContent>
            </Card>
          </Link>
        </div>
      </ShellContainer>
    </Shell>
  )
}
