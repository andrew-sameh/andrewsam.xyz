import { NextRequest, NextResponse } from 'next/server'
import { env } from '@/env.mjs'

export async function GET(req: NextRequest, res: NextResponse) {
  try {
    const mode = req.nextUrl.searchParams.get('mode')

    if (!mode) {
      return NextResponse.json({ message: 'Missing mode query param' }, { status: 400 })
    }
    if (mode !== 'now-playing' && mode !== 'top-tracks') {
      return NextResponse.json({ message: 'Invalid mode query param' }, { status: 400 })
    }
    const client_id = env.SPOTIFY_CLIENT_ID || ''
    const client_secret = env.SPOTIFY_CLIENT_SECRET || ''
    const refresh_token = env.SPOTIFY_REFRESH_TOKEN || ''

    if (!client_id || !client_secret || !refresh_token) {
      return NextResponse.json(
        {
          message:
            'Missing `SPOTIFY_CLIENT_ID`, `SPOTIFY_CLIENT_SECRET`, or `SPOTIFY_REFRESH_TOKEN` env variable',
        },
        { status: 400 }
      )
    }
    const basic = Buffer.from(`${client_id}:${client_secret}`).toString('base64')
    const NOW_PLAYING_ENDPOINT = `https://api.spotify.com/v1/me/player/currently-playing`
    const TOP_TRACKS_ENDPOINT = `https://api.spotify.com/v1/me/top/tracks?time_range=short_term&limit=10&offset=0`
    // short_term
    // medium_term
    // long_term
    const TOKEN_ENDPOINT = `https://accounts.spotify.com/api/token`

    const getAccessToken = async () => {
      const response = await fetch(TOKEN_ENDPOINT, {
        method: 'POST',
        headers: {
          Authorization: `Basic ${basic}`,
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
          grant_type: 'refresh_token',
          refresh_token,
        }),
        next: {
          revalidate: 3600,
        },
      })

      return response.json()
    }

    const getNowPlaying = async () => {
      const { access_token } = await getAccessToken()

      return fetch(NOW_PLAYING_ENDPOINT, {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
        next: {
          revalidate: 30,
        },
      })
    }

    const getTopTracks = async () => {
      const { access_token } = await getAccessToken()

      return fetch(TOP_TRACKS_ENDPOINT, {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      })
    }

    if (mode === 'now-playing') {
      try {
        const response = await getNowPlaying()
        if (response.status === 204 || response.status > 400) {
          return NextResponse.json({ isPlaying: false }, { status: 200 })
        }
        const responseData = await response.json()
        const data = {
          isPlaying: responseData.is_playing,
          title: responseData.item.name,
          album: responseData.item.album.name,
          artist: responseData.item.album.artists.map((artist) => artist.name).join(', '),
          albumImageUrl: responseData.item.album.images[0].url,
          songUrl: responseData.item.external_urls.spotify,
        }

        return NextResponse.json(data, { status: 200 })
      } catch (error) {
        return NextResponse.json(
          { message: 'Unable to fetch now playing data', error: error?.toString() },
          { status: 500 }
        )
      }
    }

    if (mode === 'top-tracks') {
      try {
        const response = await getTopTracks()
        if (response.status === 204 || response.status > 400) {
          return NextResponse.json({ message: 'No data' }, { status: 204 })
        }
        const data = await response.json()
        return NextResponse.json(data, { status: 200 })
      } catch (error) {
        return NextResponse.json(
          { message: 'Unable to fetch top tracks data', error: error?.toString() },
          { status: 500 }
        )
      }
    }
  } catch (error) {
    return NextResponse.json(
      { message: 'Unable to fetch repo data', error: error?.toString() },
      { status: 500 }
    )
  }
}
