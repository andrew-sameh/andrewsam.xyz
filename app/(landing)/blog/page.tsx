import ListLayout from '@/layouts/ListLayout'
import { allCoreContent, sortPosts } from 'pliny/utils/contentlayer'
import { allBlogs } from 'contentlayer/generated'
import { genPageMetadata } from 'app/seo'
// import SectionContainer from '@/components/SectionContainer'

const POSTS_PER_PAGE = 5

export const metadata = genPageMetadata({ title: 'Blog' })

export default function BlogPage() {
  // const posts = allCoreContent(sortPosts(allBlogs))
  const posts = allCoreContent(sortPosts(allBlogs.filter((p) => !p.hidden)))
  const pageNumber = 1
  const initialDisplayPosts = posts.slice(
    POSTS_PER_PAGE * (pageNumber - 1),
    POSTS_PER_PAGE * pageNumber
  )
  const pagination = {
    currentPage: pageNumber,
    totalPages: Math.ceil(posts.length / POSTS_PER_PAGE),
  }

  return (
    // <SectionContainer size='md'>
    <div className=" divide-y divide-accent-foreground dark:divide-accent">
      <ListLayout
        posts={posts}
        initialDisplayPosts={initialDisplayPosts}
        pagination={pagination}
        title="All Posts"
      />
    </div>
    // </SectionContainer>
  )
}
