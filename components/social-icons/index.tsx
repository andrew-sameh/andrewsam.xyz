import {
  NextJs,
  Tailwind,
  TypeScript,
  ShadCn,
  Umami,
  Mongodb,
  Markdown,
  Prisma,
  // Pinecone,
  Bash,
  Django,
  Linux,
  Docker,
  VsCode,
  Azure,
  Arduino,
  AzureDevOps,
  CLang,
  CSS,
  DBeaver,
  FastAPI,
  Flask,
  GoLang,
  GraphQL,
  HTML,
  JavaScript,
  JSON,
  Jira,
  Kaggle,
  Kub,
  NGINX,
  NodeJs,
  Notion,
  Pandas,
  Plotly,
  PlayWright,
  Powershell,
  Postgres,
  Pytest,
  Python,
  React,
  Redis,
  Selenium,
  Streamlit,
  Svelte,
  Swagger,
  Vercel,
  Vite,
  Windows,
  Yarn,
  Yaml,
  AWS,
  Anaconda,
  Git,
  PyTorch,
  BootStrap,
  NodeJS,
  Postman,
  Sanity,
  SvelteKit,
  Numpy,
  Matplotlib,
  Jupyter,
  SciKitLearn,
  Gradio,
  Grafana,
  Celery,
  TestRail,
  LangChain,
  Seaborn,
  PowerBi,
  DataDog,
  HuggingFace,
  Pinecone,
  Rust,
  ThreeJS,
  Node,
  Poetry,
  MySQL,
  PNPM,
  GithubActions,
  FramerMotion,
  RabbitMQ,
  Tableau,
  MeiliSearch,
  Mistral,
  Opensource,
  VLLM,
  Locust,
  Fiber,
  Stripe,
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
import { LuExternalLink } from 'react-icons/lu'
import { LuGitFork } from 'react-icons/lu'
import { LuStar } from 'react-icons/lu'
import { RiOpenaiFill } from 'react-icons/ri'
import { LuSearch } from 'react-icons/lu'
import { BsSearchHeartFill } from 'react-icons/bs'
import { LuLayoutDashboard } from 'react-icons/lu'
import { MdAdminPanelSettings } from 'react-icons/md'
import { RiToolsFill } from 'react-icons/ri'
import { LuSettings } from 'react-icons/lu'
import { LuLogOut } from 'react-icons/lu'
import { LuPizza } from 'react-icons/lu'
import { LuCandy } from 'react-icons/lu'
import { SiBuymeacoffee } from 'react-icons/si'

const components = {
  candy: LuCandy,
  buymeacoffee: SiBuymeacoffee,
  pizza: LuPizza,
  dashboard: LuLayoutDashboard,
  logout: LuLogOut,
  admin: MdAdminPanelSettings,
  settings: LuSettings,
  tools: RiToolsFill,
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
  bash: Bash,
  django: Django,
  linux: Linux,
  docker: Docker,
  vscode: VsCode,
  azure: Azure,
  arduino: Arduino,
  azuredevops: AzureDevOps,
  clang: CLang,
  css: CSS,
  dbeaver: DBeaver,
  fastapi: FastAPI,
  flask: Flask,
  golang: GoLang,
  graphql: GraphQL,
  html: HTML,
  javascript: JavaScript,
  json: JSON,
  jira: Jira,
  kaggle: Kaggle,
  kub: Kub,
  nginx: NGINX,
  nodejs: NodeJs,
  notion: Notion,
  pandas: Pandas,
  plotly: Plotly,
  playwright: PlayWright,
  powershell: Powershell,
  postgres: Postgres,
  pytest: Pytest,
  python: Python,
  react: React,
  redis: Redis,
  selenium: Selenium,
  streamlit: Streamlit,
  svelte: Svelte,
  swagger: Swagger,
  vercel: Vercel,
  vite: Vite,
  windows: Windows,
  yarn: Yarn,
  yaml: Yaml,
  aws: AWS,
  anaconda: Anaconda,
  git: Git,
  pytorch: PyTorch,
  bootstrap: BootStrap,
  postman: Postman,
  sanity: Sanity,
  sveltekit: SvelteKit,
  numpy: Numpy,
  matplotlib: Matplotlib,
  jupyter: Jupyter,
  scikitlearn: SciKitLearn,
  grafana: Grafana,
  gradio: Gradio,
  celery: Celery,
  testrail: TestRail,
  langchain: LangChain,
  seaborn: Seaborn,
  powerbi: PowerBi,
  datadog: DataDog,
  huggingface: HuggingFace,
  rust: Rust,
  threejs: ThreeJS,
  node: Node,
  poetry: Poetry,
  mysql: MySQL,
  pnpm: PNPM,
  githubactions: GithubActions,
  framermotion: FramerMotion,
  rabbitmq: RabbitMQ,
  tableau: Tableau,
  meilisearch: MeiliSearch,
  mistral: Mistral,
  opensource: Opensource,
  locust: Locust,
  vllm: VLLM,
  fiber: Fiber,
  stripe: Stripe,
}

type IconsBundleProps = {
  kind: keyof typeof components | string
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

  // check if kind already exists in the components object
  if (kind in components === false) {
    return null
  }

  if ((iconType === 'link' || iconType === 'Link' || iconType === 'LinkButton') && !href) {
    return null
  }

  // if (!href || (kind === 'mail' && !/^mailto:\w+([.-]?\w+)@\w+([.-]?\w+)(.\w{2,3})+$/.test(href)))
  //   return (
  //     <SocialSvg
  //       className={`${hover ? 'hover:text-red-500 dark:hover:text-red-400' : ''} h-${size} w-${size}`}
  //     />
  //   )
  // convert tailwind size to px

  const combinedClass = cn(`${text ? 'mr-2' : ''}  h-${size} w-${size}`, className)

  const combinedParentClass = cn(
    'flex items-center justify-center',
    `${hover ? 'hover:text-sky-900 dark:hover:text-sky-900' : ''}`,
    parentClassName
  )

  if (iconType === 'LinkButton' && href) {
    return (
      <Button
        variant={variant}
        size={!text ? 'icon' : 'default'}
        className={combinedParentClass}
        asChild
      >
        <Link href={href} target={target}>
          <span className="sr-only">{kind}</span>
          <SocialSvg className={combinedClass} strokeWidth={strokeWidth} />
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
    return <SocialSvg className={cn(`h-${size} w-${size}`, className)} strokeWidth={strokeWidth} />
  }

  if (iconType === 'linkButton' && href) {
    return (
      <Button
        variant={variant}
        size={!text ? 'icon' : 'default'}
        className={parentClassName}
        asChild
      >
        <a
          className={cn('text-sm transition', combinedParentClass)}
          target={'_blank'}
          rel="noopener noreferrer"
          href={href}
        >
          <span className="sr-only">{kind}</span>
          <SocialSvg className={combinedClass} strokeWidth={strokeWidth} />
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
        <SocialSvg className={combinedClass} strokeWidth={strokeWidth} />
        {text}
      </a>
    </>
  )
}

export default IconsBundle
