import SectionContainer from '@/components/SectionContainer'

import { genPageMetadata } from 'app/seo'
export const metadata = genPageMetadata({ title: 'Authentication Error' })

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return <div className="">{children}</div>
}
