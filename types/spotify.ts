export type Artist = {
  id: string
  name: string
  type: string
  href: string
}

export type Album ={
    name: string
    images: AlbumImage[]
    external_urls: { spotify: string }
}
export type TrackInfo = {
  artists: Artist[]
  external_urls: { spotify: string }
  name: string
  album: Album
}

export type AlbumImage = { height: number; url: string; width: number }

export type Song = {
  songUrl: string
  artist: string
  title: string
  album: string
  albumImageUrl: string
}

export type TopTracks = {
  tracks: Song[]
}

export type NowPlayingSong = {
  album: string
  albumImageUrl: string
  artist: string
  isPlaying: boolean
  songUrl: string
  title: string
}

export interface SpotifyNowPlayingData {
  isPlaying: boolean
  songUrl?: string
  title?: string
  artist?: string
  album?: string
  albumImageUrl?: string
}
