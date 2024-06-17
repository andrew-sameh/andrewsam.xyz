'use client'
import { useEffect, useRef } from 'react'
import Typed from 'typed.js'
import IconsBundle from '@/components/social-icons'
import { ModelViewer } from '@/components/landing/model-viewer'

function createTypedInstance(el: HTMLElement) {
  return new Typed(el, {
    stringsElement: '#bios',
    typeSpeed: 100,
    autoInsertCss: true,
    cursorChar: '|', // specify the cursor character
    // attr: 'text-4xl font-extrabold' , // specify additional HTML attributes
    // backSpeed: 100,
    // loop: true,
    // backDelay: 1000,
  })
}

export default function Hero() {
  let el = useRef(null)
  let typed = useRef<Typed | null>(null)

  useEffect(() => {
    if (el.current) {
      typed.current = createTypedInstance(el.current)
      //   typed.current.cursor = (<span className="">|</span>)
    }
    return () => {
      typed?.current?.destroy()
    }
  }, [])

  return (
    <div className="container mx-auto -mt-16 flex h-screen flex-col content-center justify-center px-4 py-5 text-center">
        <ModelViewer />
      <div>
        <ul id="bios" className="hidden">
          <li>Hi it's Andrew!</li>
        </ul>
        <span
          ref={el}
          className=" text-4xl font-extrabold tracking-tighter text-primary sm:text-6xl"
        />
      </div>
      <p className="mx-auto mt-3 max-w-md text-gray-500 dark:text-gray-400 md:text-xl lg:text-lg xl:text-xl">
        Vercel's frontend cloud gives developers the workflows, frameworks, and infrastructure to
        build a faster, more personalized Web.
      </p>

      <IconsBundle
        kind="mail"
        iconType="linkButton"
        href="mailto:"
        text="Say Hi!"
        size={5}
        parentClassName="w-32 mx-auto p-4 mt-3"
      />
    </div>
  )
}
