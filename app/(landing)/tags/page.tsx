import Link from '@/components/Link'
import Tag from '@/components/Tag'
import { slug } from 'github-slugger'
import tagData from 'app/tag-data.json'
import { genPageMetadata } from 'app/seo'
import SectionContainer from '@/components/SectionContainer'
export const metadata = genPageMetadata({ title: 'Tags', description: 'Things I blog about' })
import { Separator } from '@/components/ui/separator'

export default async function Page() {
  const tagCounts = tagData as Record<string, number>
  const tagKeys = Object.keys(tagCounts)
  const sortedTags = tagKeys.sort((a, b) => tagCounts[b] - tagCounts[a])
  return (
    <>
      <SectionContainer size="lg">
        <div className="flex flex-col items-start justify-start  md:mt-24 md:flex-row md:items-center md:justify-center md:space-x-6 md:divide-y-0">
          <div className="space-x-2 pb-8 pt-6 md:space-y-5">
            <h1 className="text-3xl font-extrabold leading-9 tracking-tight sm:text-4xl sm:leading-10 md:border-r-2 md:px-6 md:text-6xl md:leading-14">
              Tags
            </h1>
          </div>
          <Separator />
          <div className="flex flex-wrap">
            {tagKeys.length === 0 && 'No tags found.'}
            {sortedTags.map((t) => {
              return (
                <div key={t} className="mb-2 mr-5 mt-2">
                  <Tag text={t} />
                  <Link
                    href={`/tags/${slug(t)}`}
                    className="-ml-2 text-sm font-semibold uppercase"
                    aria-label={`View posts tagged ${t}`}
                  >
                    {` (${tagCounts[t]})`}
                  </Link>
                </div>
              )
            })}
          </div>
        </div>
      </SectionContainer>
    </>
  )
}
