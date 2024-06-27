// import Link from '@/components/Link'
// import Tag from '@/components/Tag'
import siteMetadata from '@/data/siteMetadata'
// import { formatDate } from 'pliny/utils/formatDate'
import NewsletterForm from 'pliny/ui/NewsletterForm'
import { LuLoader2 } from 'react-icons/lu'

import { Suspense } from 'react'
import TopTracks from '@/components/spotify/TopTracks'
import SectionContainer from '@/components/SectionContainer'
import RecentPosts from '@/components/RecentPosts'
import Hero from '@/components/landing/Hero'
import { Technologies } from '@/components/landing/Technologies'
import { Experience } from '@/components/landing/Experience'
import { GithubCal } from '@/components/landing/GithubCal'
import { Separator } from '@/components/ui/separator'
import { MeteorsDemo } from '@/components/landing/GlitchyCards'
export default function Home({ posts }) {
  return (
    <>
      <div className="">
        <Suspense fallback={<LuLoader2 className="mx-auto my-10 h-4 w-4 animate-spin" />}>
          <Hero />
        </Suspense>

        <SectionContainer>
          <Separator />
          <Technologies />
        </SectionContainer>
        <SectionContainer>
          <Separator />
          <Experience />
        </SectionContainer>
        <SectionContainer>
          <Separator />
          <Suspense fallback={<LuLoader2 className="mx-auto my-10 h-4 w-4 animate-spin" />}>
            <GithubCal />
          </Suspense>
        </SectionContainer>
        <SectionContainer>
          <Separator />
          <Suspense fallback={<LuLoader2 className="mx-auto my-10 h-4 w-4 animate-spin" />}>
            <RecentPosts posts={posts} />
          </Suspense>
        </SectionContainer>
        <SectionContainer>
          <Separator />
          <TopTracks />
        </SectionContainer>
        <SectionContainer>
          <Separator />
          <MeteorsDemo />
        </SectionContainer>

        {/* {siteMetadata.newsletter?.provider && (
          <div className="flex items-center justify-center pt-4">{<NewsletterForm />}</div>
        )} */}
      </div>
    </>
  )
}
