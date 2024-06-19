import type { ImageProps as NextImageProps } from 'next/image'
import type React from 'react'
import type { projectsData } from '@/data/mainData'

export interface PageTitleProps {
  children: React.ReactNode
}

export interface ImageLightBoxProps extends Pick<NextImageProps, 'src'> {
  closeLightbox: () => void
}

export interface ImageProps extends NextImageProps {
  shouldOpenLightbox?: boolean
}

export type ProjectDataType = (typeof projectsData)[0]

export interface ProjectCardProps {
  project: ProjectDataType
}

export interface SocialButtonsProps {
  postUrl: string
  title: string
  fileName: string
}

export type TwemojiProps = {
  emoji: string
  size?: string
  className?: string
}

export interface UnsplashPhotoProps {
  photoURL: string
  author: string
}

export interface ViewCounterProps {
  slug: string
  className?: string
}
