import siteMetadata from '@/data/siteMetadata'
import Link from 'next/link'
import { Suspense } from 'react'
import NowPlaying from '@/components/spotify/NowPlaying'
import IconsBundle from '@/components/social-icons'
import { cn } from '@/lib/utils'
import SectionContainer from '@/components/SectionContainer'

export default function Footer() {
  return (
    <footer>
      <SectionContainer>
        <div className="mb-0 flex flex-col justify-start space-x-0 space-y-3 py-10">
          <div className="flex flex-col items-center space-y-3 text-sm sm:flex-row sm:justify-between sm:text-base">
            {/* <Suspense fallback="loading..."> */}
            <NowPlaying />
            {/* </Suspense> */}
            <ul className="flex cursor-pointer items-center space-x-5">
              <li>
                <IconsBundle kind="linkedin" href={siteMetadata.linkedin} size={5} />
              </li>
              <li>
                <IconsBundle kind="github" href={siteMetadata.github} size={5} />
              </li>
              <li>
                <IconsBundle kind="mail" href={`mailto:${siteMetadata.email}`} size={5} />
              </li>
              <li>
                <IconsBundle kind="spotify" href={siteMetadata.spotify} size={5} />
              </li>
              <li>
                <IconsBundle kind="instagram" href={siteMetadata.instagram} size={5} />
              </li>
              <li>
                <IconsBundle kind="buymeacoffee" href={siteMetadata.buymeacoffee} size={5} />
              </li>
              {/* <li>
              <IconsBundle kind="twitter" href={siteMetadata.twitter} size={6} />
            </li> */}
              {/* <li>
              <IconsBundle kind="x" href={siteMetadata.x} size={5} />
            </li> */}
              {/* <li>
              <IconsBundle kind="threads" href={siteMetadata.threads} size={6} />
            </li> */}
              {/* <li>
              <IconsBundle kind="youtube" href={siteMetadata.youtube} size={6} />
            </li> */}
              {/* <li>
              <IconsBundle kind="facebook" href={siteMetadata.facebook} size={6} />
            </li> */}
            </ul>
          </div>

          <div className="flex flex-col items-center space-y-3 text-xs sm:flex-row sm:justify-between sm:text-sm">
            <ul className="flex space-x-2">
              <li>{`© ${new Date().getFullYear()}`}</li>
              <li>{` • `}</li>
              <li>
                <Link href="/">{siteMetadata.title}</Link>
              </li>
              <li>{` • `}</li>
              <li>
                <IconsBundle kind="githubFork" href={siteMetadata.siteRepo} size={5} />
              </li>
            </ul>
            <ul className="flex space-x-2">
              <li>{`Powered by`}</li>
              <li>{` • `}</li>
              <li>
                <IconsBundle kind="nextjs" href={'https://nextjs.org/'} size={5} hover={false} />
              </li>
              <li>
                <IconsBundle
                  kind="typescript"
                  href={'https://www.typescriptlang.org/'}
                  size={5}
                  hover={false}
                />
              </li>
              <li>
                <IconsBundle
                  kind="tailwind"
                  href={`https://tailwindcss.com/`}
                  size={5}
                  hover={false}
                />
              </li>
              <li>
                <IconsBundle kind="shadcn" href={`https://ui.shadcn.com/`} size={5} hover={false} />
              </li>
              <li>
                <IconsBundle
                  kind="mongodb"
                  href={`https://www.mongodb.com/`}
                  size={5}
                  hover={false}
                />
              </li>
              <li>
                <IconsBundle kind="prisma" href={`https://www.prisma.io/`} size={5} hover={false} />
              </li>
              <li>
                <IconsBundle kind="umami" href={`https://umami.is/`} size={5} hover={false} />
              </li>
              {/* <li>
              <IconsBundle kind="markdown" href={`mailto:${"siteMetadata.linkedin"}`} size={5}  hover={false}/>
            </li> */}
            </ul>
          </div>
        </div>
      </SectionContainer>
    </footer>
  )
}
