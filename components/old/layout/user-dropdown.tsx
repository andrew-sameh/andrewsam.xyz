"use client";

import { useState } from "react";
import { signOut } from "next-auth/react";
// import { LayoutDashboard, LogOut } from "lucide-react";
import { LuLogOut as LogOut } from "react-icons/lu";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import Image from "next/image";
import { Session } from "next-auth";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { MdOutlineRocketLaunch } from "react-icons/md";
import { LuPlaneLanding } from "react-icons/lu";

import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
export default function UserDropdown({ session }: { session: Session }) {
  const { email, image } = session?.user || {};

  if (!email) return null;

  return (
    <div className="relative flex justify-center text-left">
      <Popover>
        <PopoverTrigger asChild>
          <button className="flex h-8 w-8 items-center justify-center overflow-hidden rounded-full border border-gray-300 transition-all duration-75 focus:outline-none active:scale-95 sm:h-9 sm:w-9">
            <Avatar>
              <AvatarImage src={session?.user?.image || ""} alt="User Avatar" />
              <AvatarFallback>AS</AvatarFallback>
            </Avatar>
          </button>
        </PopoverTrigger>
        <PopoverContent className="w-full rounded-lg bg-white p-2 sm:w-80">
          <div className="">
            <div className="p-2">
              {session?.user?.name && (
                <p className="truncate text-sm font-medium text-gray-900">
                  {session?.user?.name}
                </p>
              )}
              <p className="truncate text-sm text-gray-500">
                {session?.user?.email}
              </p>
            </div>
            <button className="relative flex w-full items-center justify-start space-x-2 rounded-md p-2 text-left text-sm transition-all duration-75 hover:bg-gray-100">
              <Link href="/" className="flex w-full space-x-2">
                <LuPlaneLanding className="h-4 w-4" />
                <p className="text-sm">Landing Page</p>
              </Link>
            </button>
            <button className="relative flex w-full items-center justify-start space-x-2 rounded-md p-2 text-left text-sm transition-all duration-75 hover:bg-yellow-300">
              <Link href="/ai" className="flex w-full space-x-2 ">
                <MdOutlineRocketLaunch className="h-4 w-4" />
                <p className="text-sm">App</p>
              </Link>
            </button>
            <button
              className="relative flex w-full items-center justify-start space-x-2 rounded-md p-2 text-left text-sm transition-all duration-75 hover:bg-gray-100"
              onClick={() => signOut()}
            >
              <LogOut className="h-4 w-4" />
              <p className="text-sm">Logout</p>
            </button>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}
