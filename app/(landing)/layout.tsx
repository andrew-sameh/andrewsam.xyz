import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { auth } from '@/auth'
import siteMetadata from '@/data/siteMetadata'
import { SearchProvider, SearchConfig } from 'pliny/search'

export default async function RootPublicLayout({ children }: { children: React.ReactNode }) {
  const session = await auth()

  return (
    <>
      <SearchProvider searchConfig={siteMetadata.search as SearchConfig}>
        <Header session={session} />
        <main className="mb-auto pt-20">{children}</main>
        <Footer />
      </SearchProvider>
    </>
  )
}
