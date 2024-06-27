import { Song } from '@/types/spotify'
import NextImage from 'next/image'
interface TrackProps {
  ranking: number
  track: Song
}

export default function Track({ track, ranking }: TrackProps) {
  return (
    <div className="mt-8 flex w-full max-w-5xl flex-row  border-b border-gray-200 dark:border-gray-800">
      <p className="text-sm font-bold ">{ranking}</p>
      <div className="flex flex-col pl-3">
        <NextImage
          src={track.albumImageUrl}
          alt={`Album cover of ${track.album}`}
          width={48}
          height={48}
        />
      </div>
      <div className="flex flex-col pl-3">
        <a
          className="w-60 truncate font-medium  sm:w-96 md:w-full"
          href={track.songUrl}
          target="_blank"
          rel="noopener noreferrer"
        >
          {track.title}
        </a>
        <p className="mb-4 w-60 truncate  sm:w-96 md:w-full">{track.artist}</p>
      </div>
    </div>
  )
}
