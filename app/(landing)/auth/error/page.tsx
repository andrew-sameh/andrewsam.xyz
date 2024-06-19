'use client'
import { useSearchParams } from 'next/navigation'
import Image from 'next/image'
import SiteLogo from '@/components/SiteLogos'

export default function AuthErroPage() {
  // error passed in query params as ?error=

  const searchParams = useSearchParams()

  const error = searchParams.get('error')

  return (
    <div className="mt-20 flex items-center justify-center  md:mt-20 lg:mt-20 xl:mt-10 2xl:mt-40  ">
      <div className="mx-auto my-auto flex w-full flex-col justify-center space-y-6 px-2 sm:w-[500px]">
        <div className="flex flex-col content-center justify-center space-y-2 text-center">
          <SiteLogo kind="logo" logoType="image" className="mx-auto h-12 w-12" />

          <h1 className="text-2xl font-semibold tracking-tight">
            An error occurred while processing you authentication request.
          </h1>
          <p className="text-lg">{error}</p>
        </div>
      </div>
    </div>
  )
}
