import 'css/prism.css'
import 'katex/dist/katex.css'
import '@/css/resume.css'
import { components } from '@/components/MDXComponents'
import { MDXLayoutRenderer } from 'pliny/mdx-components'

import { Resume, allResumes } from 'contentlayer/generated'
import SectionContainer from '@/components/SectionContainer'

import ResumeLayout from '@/layouts/ResumeLayout'
import { genPageMetadata } from 'app/seo'

export const metadata = genPageMetadata({ title: 'About' })

export default function Page() {
  const resume = allResumes.find((p) => p.slug === 'default') as Resume
  // Convert resume.toc from string to TOC[]
  return (
    <>
      <SectionContainer>
        <ResumeLayout toc={resume.toc}>
          <MDXLayoutRenderer code={resume.body.code} components={components} toc={resume.toc} />
        </ResumeLayout>
      </SectionContainer>
    </>
  )
}
