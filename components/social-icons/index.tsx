import {
  NextJs,
  Tailwind,
  TypeScript,
  ShadCn,
  Umami,
  Mongodb,
  Markdown,
  Prisma,
  Pinecone
} from './icons'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import Link from 'next/link'

import { LuMail } from 'react-icons/lu'
import { AiFillSpotify } from 'react-icons/ai'
import { AiFillGithub } from 'react-icons/ai'
import { AiFillFacebook } from 'react-icons/ai'
import { AiFillYoutube } from 'react-icons/ai'
import { AiFillLinkedin } from 'react-icons/ai'
import { AiOutlineTwitter } from 'react-icons/ai'
import { RiTwitterXFill } from 'react-icons/ri'
import { RiMastodonFill } from 'react-icons/ri'
import { RiThreadsFill } from 'react-icons/ri'
import { AiFillInstagram } from 'react-icons/ai'
import { LuExternalLink } from "react-icons/lu";
import { LuGitFork } from "react-icons/lu";
import { LuStar } from "react-icons/lu";
import { RiOpenaiFill } from "react-icons/ri";
import { LuSearch } from "react-icons/lu";
import { BsSearchHeartFill } from "react-icons/bs";

const components = {
  mail: LuMail,
  spotify: AiFillSpotify,
  github: AiFillGithub,
  facebook: AiFillFacebook,
  youtube: AiFillYoutube,
  linkedin: AiFillLinkedin,
  twitter: AiOutlineTwitter,
  x: RiTwitterXFill,
  mastodon: RiMastodonFill,
  threads: RiThreadsFill,
  instagram: AiFillInstagram,
  githubFork: LuGitFork,
  githubStar: LuStar,
  externalLink: LuExternalLink,
  openai: RiOpenaiFill,
  search: LuSearch,
  searchHeart: BsSearchHeartFill,

  nextjs: NextJs,
  tailwind: Tailwind,
  typescript: TypeScript,
  shadcn: ShadCn,
  umami: Umami,
  mongodb: Mongodb,
  markdown: Markdown,
  prisma: Prisma,
  pinecone: Pinecone,
}

type IconsBundleProps = {
  kind: keyof typeof components
  href?: string | undefined
  size?: number
  hover?: boolean
  iconType?: 'linkButton' | 'link' | 'icon' | 'Link' | 'LinkButton'
  variant?: 'link' | 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost'
  className?: string
  parentClassName?: string
  target?: '_blank' | '_self' | '_parent' | '_top'
  text?: string
  strokeWidth?: number
}

const IconsBundle = ({
  kind,
  href,
  size = 8,
  iconType = 'link',
  variant = 'outline',
  className,
  parentClassName,
  hover = true,
  target,
  text,
  strokeWidth,
}: IconsBundleProps) => {
  const SocialSvg = components[kind]

  // if (!href || (kind === 'mail' && !/^mailto:\w+([.-]?\w+)@\w+([.-]?\w+)(.\w{2,3})+$/.test(href)))
  //   return (
  //     <SocialSvg
  //       className={`${hover ? 'hover:text-red-500 dark:hover:text-red-400' : ''} h-${size} w-${size}`}
  //     />
  //   )
  // convert tailwind size to px

  const combinedClass = cn(
    `${text ? 'mr-2' : ''}  h-${size} w-${size}`,
    className
  )

  const combinedParentClass = cn(
    'flex items-center justify-center',
    `${hover ? 'hover:text-blue-500 dark:hover:text-blue-400' : ''}`,
    parentClassName
  )

  if (iconType === 'LinkButton' && href) {
    return (
      <Button variant={variant} size={ !text ? "icon" : "default"} className={combinedParentClass} asChild>
        <Link href={href} target={target}>
          <span className="sr-only">{kind}</span>
          <SocialSvg className={combinedClass} strokeWidth={strokeWidth}/>
          {text}
        </Link>
      </Button>
    )
  }
  if (iconType === 'Link' && href) {
    return (
      <Link href={href} className={combinedParentClass} target={target}>
        <span className="sr-only">{kind}</span>
        <SocialSvg className={combinedClass} strokeWidth={strokeWidth} />
        {text}
      </Link>
    )
  }

  if (iconType === 'icon') {
    return <SocialSvg className={cn(`h-${size} w-${size}`,className)} strokeWidth={strokeWidth} />
  }

  if (iconType === 'linkButton' && href) {
    return (
      <Button variant={variant} size={ !text ? "icon" : "default"} className={parentClassName} asChild>
        <a
          className={cn('text-sm transition', combinedParentClass)}
          target={'_blank'}
          rel="noopener noreferrer"
          href={href}
        >
          <span className="sr-only">{kind}</span>
          <SocialSvg className={combinedClass} strokeWidth={strokeWidth}  />
          {text}
        </a>
      </Button>
    )
  }

  return (
    <>
      <a
        className={cn('text-sm transition', combinedParentClass)}
        target={'_blank'}
        rel="noopener noreferrer"
        href={href}
      >
        <span className="sr-only">{kind}</span>
        <SocialSvg className={combinedClass} strokeWidth={strokeWidth}/>
        {text}
      </a>
    </>
  )
}

export default IconsBundle
