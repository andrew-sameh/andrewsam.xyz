// import Link from '@/components/Link'
// import Tag from '@/components/Tag'
import siteMetadata from '@/data/siteMetadata'
// import { formatDate } from 'pliny/utils/formatDate'
import NewsletterForm from 'pliny/ui/NewsletterForm'
import { Suspense } from 'react'
import TopTracks from '@/components/spotify/TopTracks'
import SectionContainer from '@/components/SectionContainer'
import RecentPosts from '@/components/RecentPosts'
import Hero from '@/components/landing/Hero'
import { Technologies } from '@/components/landing/Technologies'
import { Experience } from '@/components/landing/Experience'
import { GithubCal } from '@/components/landing/GithubCal'
export default function Home({ posts }) {
  return (
    <>
      <div className="divide-y">
        <Hero />
        <SectionContainer>
          <Technologies />
        </SectionContainer>
        <SectionContainer>
          <Experience />
        </SectionContainer>
        <SectionContainer>
          <Suspense fallback="loading..">
            <GithubCal />
          </Suspense>
        </SectionContainer>
        <SectionContainer>
          <Suspense fallback="loading..">
            <RecentPosts posts={posts} />
          </Suspense>
        </SectionContainer>
        <SectionContainer>
          <Suspense fallback="loading..">
            <TopTracks />
          </Suspense>
        </SectionContainer>
        {/* {siteMetadata.newsletter?.provider && (
          <div className="flex items-center justify-center pt-4">{<NewsletterForm />}</div>
        )} */}
      </div>
    </>
  )
}
