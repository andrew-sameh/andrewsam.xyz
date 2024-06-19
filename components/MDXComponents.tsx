import TOCInline from 'pliny/ui/TOCInline'
import Pre from 'pliny/ui/Pre'
import BlogNewsletterForm from 'pliny/ui/BlogNewsletterForm'
import type { MDXComponents } from 'mdx/types'
import Image from './Image'
import CustomLink from './Link'
import TableWrapper from './TableWrapper'

import Box from '@/components/mdx/Box'
import Challenge from '@/components/mdx/Challenge'
import CodeBlock from '@/components/mdx/CodeBlock'
import CountryFlag from '@/components/mdx/CountryFlag'
import StaticTweet from '@/components/mdx/StaticTweet'
import YouTube from '@/components/mdx/YouTube'
import FullWidthSection from '@/components/mdx/FullWidthSection'

export const components: MDXComponents = {
  Image,
  TOCInline,
  a: CustomLink,
  pre: Pre,
  table: TableWrapper,
  BlogNewsletterForm,
  CodeBlock,
  CountryFlag,
  Challenge,
  StaticTweet,
  Box,
  YouTube,
  FullWidthSection,
}
