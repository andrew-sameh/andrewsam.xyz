import { kebabCase } from '@/lib/utils'

export type TwemojiProps = {
  emoji: string
  size?: string
  className?: string
}

export function Twemoji({ emoji, size = 'twa-lg', className }: TwemojiProps) {
  const cls = `inline-block twa ${size} twa-${kebabCase(emoji)} ${className || ''}`
  return <i className={cls.trim()} />
}

export default Twemoji
