import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/prisma'
import { v4 as uuidv4 } from 'uuid'

function generate16CharId(): string {
  const uuid = uuidv4()
  const base64Uuid = Buffer.from(uuid).toString('base64').replace(/=+$/, '').substring(0, 16)
  return base64Uuid
}

const jsonResponse = (data: object, status: number) =>
  new NextResponse(JSON.stringify(data), {
    status,
    headers: {
      'Content-Type': 'application/json',
    },
  })

export async function GET(req: NextRequest, res: NextResponse) {
  const slug = req.nextUrl.searchParams.get('slug')
  if (!slug) {
    return jsonResponse({ error: 'Slug is required' }, 400)
  }
  const ip = req.ip ?? '127.0.0.1'
  console.log('ip: ' + ip)

  try {
    const blog = await db.blog.findUnique({
      where: { slug },
    })

    if (!blog) {
      return jsonResponse({ error: 'Blog not found' }, 404)
    }

    const guestUser = await db.guestUser.findUnique({
      where: {
        ip,
      },
    })

    const blogLike = guestUser
      ? await db.blogLike.findFirst({
          where: {
            blogId: blog.id,
            guestId: guestUser.id,
          },
        })
      : null

    const userLikes = blogLike?.count ?? 0

    return jsonResponse({ slug, likes: blog.likes, userLikes }, 200)
  } catch (error) {
    console.error('error:', error)
    return jsonResponse({ error: 'Internal server error' }, 500)
  }
}

export async function POST(req: NextRequest): Promise<NextResponse> {
  if (req.headers.get('Content-Type') !== 'application/json') {
    return new NextResponse('Content type must be json', { status: 400 })
  }
  const body = await req.json()
  const slug = body.slug
  const ip = req.ip ?? '127.0.0.1'

  if (!slug) {
    return jsonResponse({ error: 'Slug is required' }, 400)
  }
  try {
    const blog = await db.blog.update({
      where: { slug },
      data: {
        likes: {
          increment: 1,
        },
      },
    })
    if (!blog) {
      return jsonResponse({ error: 'Blog not found' }, 404)
    }

    let guestUser = await db.guestUser.findUnique({
      where: { ip },
    })

    // if guest user does not exist, create a new guest user
    if (!guestUser) {
      const generatedId = generate16CharId()
      guestUser = await db.guestUser.create({
        data: {
          ip,
          generatedId,
        },
      })
    }

    const updatedBlogLike = await db.blogLike.upsert({
      where: {
        guestId_blogId: {
          guestId: guestUser.id,
          blogId: blog.id,
        },
      },
      update: {
        count: {
          increment: 1,
        },
      },
      create: {
        blogId: blog.id,
        guestId: guestUser.id,
        count: 1,
      },
    })

    return new NextResponse(
      JSON.stringify({ slug, likes: blog.likes, userLikes: updatedBlogLike.count }),
      {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
        },
      }
    )
  } catch (error) {
    console.error('Error processing request:', error)
    return new NextResponse('Internal server error', { status: 500 })
  }
}
