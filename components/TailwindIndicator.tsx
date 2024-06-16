
import { env } from "@/env.mjs";
export function TailwindIndicator() {
    if (env.NODE_ENV === "production") return null
  
    return (
      <div className="fixed bottom-1 start-1 z-50 flex h-6 w-6 items-center justify-center rounded-full bg-gray-800 p-3 font-mono text-xs text-white">
        <div className="block sm:hidden md:hidden lg:hidden xl:hidden 2xl:hidden 3xl:hidden">xs</div>
        <div className="hidden sm:block md:hidden lg:hidden xl:hidden 2xl:hidden 3xl:hidden">
          sm
        </div>
        <div className="hidden md:block lg:hidden xl:hidden 2xl:hidden 3xl:hidden">md</div>
        <div className="hidden lg:block xl:hidden 2xl:hidden 3xl:hidden">lg</div>
        <div className="hidden xl:block 2xl:hidden 3xl:hidden">xl</div>
        <div className="hidden 2xl:block 3xl:hidden">2xl</div>
        <div className="hidden 3xl:block">3xl</div>
      </div>
    )
  }
  