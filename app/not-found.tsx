import Link from '@/components/Link'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { auth } from '@/auth'
import Image from 'next/image'
import GIF from '@/public/static/gifs/confused-travolta.gif'
import { cn } from '@/lib/utils'
import { buttonVariants, Button } from '@/components/ui/button'
import SiteLogo from '@/components/SiteLogos'

import { genPageMetadata } from 'app/seo'
export const metadata = genPageMetadata({ title: 'Check Google Maps!' })

export default async function NotFound() {
  const session = await auth()

  return (
    <>
      <Header session={session} />
      <main className="mb-auto pt-32">
        <div className="mb-auto flex flex-col content-center space-y-10">
          {/* <div className="flex flex-col items-start justify-start md:mt-24 md:flex-row md:items-center md:justify-center md:space-x-6 ">
            <div className="space-x-2 pb-8 pt-6 md:space-y-5">
              <h1 className="text-6xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 md:border-r-2 md:px-6 md:text-8xl md:leading-14">
                404
              </h1>
            </div>
            <div className="max-w-md">
              <p className="mb-4 text-xl font-bold leading-normal md:text-2xl">
                Sorry we couldn't find this page.
              </p>
              <p className="mb-8">
                But dont worry, you can find plenty of other things on our homepage.
              </p>
            </div>
          </div> */}

          <div className="mx-auto mt-5">
            <SiteLogo kind={'logo'} size={15} logoType="image" parentClassName={'mx-auto'} />
          </div>
          <Image src={GIF} alt="Page Not Found GIF Wink" className="mx-auto mt-16 "></Image>
          <p className="mx-auto mb-4 text-xl font-bold leading-normal md:text-2xl">
            Lost your way?
          </p>
          <Button asChild className={cn(buttonVariants({ variant: 'secondary' }), 'mx-auto')}>
            <Link href="/">Back to homepage</Link>
          </Button>
        </div>
      </main>
      <Footer />
    </>
  )
}
