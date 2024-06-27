'use client'
// import { getTopTracks } from '@/lib/spotify'
import Track from './Track'
import { Song, TrackInfo } from '@/types/spotify'
import React, { useState, useEffect } from 'react'
import { LuLoader2 } from 'react-icons/lu'

async function fetchTopTracks(): Promise<Song[] | null> {
  try {
    const response = await fetch('/api/spotify?mode=top-tracks')
    // const response = await getTopTracks()
    const { items } = await response.json()

    const tracks = items.slice(0, 5).map((track: TrackInfo) => ({
      artist: track.artists.map((_artist) => _artist.name).join(', '),
      songUrl: track.external_urls.spotify,
      title: track.name,
      albumImageUrl: track.album.images[0].url,
      album: track.album.name,
    }))

    return tracks
  } catch (e) {
    if (e instanceof Error) {
      console.error(e.message)
    }
  }

  return null
}

export default function TopTracks() {
  const [topTracks, setTopTracks] = useState<Song[] | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadTopTracks = async () => {
      const tracks = await fetchTopTracks()
      setTopTracks(tracks)
      setLoading(false)
    }

    loadTopTracks()
  }, [])

  if (loading) {
    return (
      <div className="my-10">
        <h1 className="text-2xl font-extrabold leading-9 tracking-tight sm:text-3xl sm:leading-10 md:text-4xl md:leading-14">
          My <span className="text-green-700 dark:text-green-500">Spotify</span> Top Songs
        </h1>
        <LuLoader2 className="mx-auto my-10 h-4 w-4 animate-spin" />
        <LuLoader2 className="mx-auto my-10 h-4 w-4 animate-spin" />
      </div>
    )
  }

  return (
    <div className="my-10">
      <h1 className="text-2xl font-extrabold leading-9 tracking-tight sm:text-3xl sm:leading-10 md:text-4xl md:leading-14">
        My <span className="text-green-700 dark:text-green-500">Spotify</span> Top Songs
      </h1>
      {topTracks?.map((track, index) => (
        <Track ranking={index + 1} key={track.songUrl} track={track} />
      ))}
    </div>
  )
}
