
import { Metadata } from "next";
import Image from "next/image";
import SiteLogo from "@/components/SiteLogos";


export default function VerifyEmailPage() {
  return (
    <div className="flex items-center justify-center mt-20  md:mt-20 lg:mt-20 xl:mt-10 2xl:mt-40  ">
      <div className="mx-auto my-auto flex w-full flex-col justify-center space-y-6 sm:w-[500px] px-2">
        <div className="flex flex-col content-center justify-center space-y-2 text-center">
        <SiteLogo kind="logo" logoType="image" className="mx-auto h-12 w-12" />


          <h1 className="text-2xl font-semibold tracking-tight">
            Please check your email.
          </h1>
          <p className="text-lg">
            An email has been sent to you with a link to verify your account.
          </p>
        </div>
      </div>
    </div>
  );
}
