import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/prisma'
import { allBlogs } from 'contentlayer/generated'
import type { Blog } from 'contentlayer/generated'

export async function GET(req: NextRequest, res: NextResponse) {
  const slug = req.nextUrl.searchParams.get('slug')
  console.log('slug: ' + slug)

  if (!slug) {
    return new NextResponse(JSON.stringify({ error: 'Slug is required' }), {
      status: 400,
      headers: {
        'Content-Type': 'application/json',
      },
    })
  }
  try {
    const postData = await db.blog.findUnique({
      where: { slug },
    })
    if (!postData) {
      const post = allBlogs.find((p) => p.slug === slug) as Blog

      if (!post) {
        return new NextResponse(JSON.stringify({ error: 'Post not found' }), {
          status: 404,
          headers: {
            'Content-Type': 'application/json',
          },
        })
      }

      // create a new post in the database
      const newBlog = await db.blog.create({
        data: {
          slug: post.slug,
          title: post.title,
          author: post.authors?.[0] ?? 'andrew',
          type: post.type,
          blogCreatedAt: post.date,
          summary: post.summary,
          layout: post.layout,
          toc: post.toc,
          structuredData: post.structuredData,
          readingTime: post.readingTime.minutes,
          content: post.body.raw,
          // tags: post.tags,
        },
      })

      const tags = post.tags

      // check if tags exist
      if (tags) {
        for (let i = 0; i < tags.length; i++) {
          const tag = tags[i]
          const tagExists = await db.tag.findUnique({
            where: { slug: tag },
          })

          if (!tagExists) {
            const newTag = await db.tag.create({
              data: {
                name: tag,
                slug: tag,
              },
            })
          }

          // add the tag to the blog
          await db.blog.update({
            where: { slug },
            data: {
              tags: {
                connect: {
                  slug: tag,
                },
              },
            },
          })
        }
      }

      return new NextResponse(JSON.stringify({ slug, pageViewCount: newBlog.views }), {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
        },
      })
    }

    return new NextResponse(JSON.stringify({ slug, pageViewCount: postData.views }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    })
  } catch (error) {
    console.error('Prisma error:', error)
    return new NextResponse(JSON.stringify({ error: 'Internal server error' }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    })
  }
}

export async function POST(req: NextRequest): Promise<NextResponse> {
  try {
    if (req.headers.get('Content-Type') !== 'application/json') {
      return new NextResponse('Content type must be json', { status: 400 })
    }

    const body = await req.json()
    if (!body.slug) {
      return new NextResponse('Slug not found', { status: 400 })
    }

    const slug = body.slug
    const ip = req.ip ?? '127.0.0.1'

    // const allowed = await ratelimiter.limit(ip)
    // if (!allowed) {
    //   return new NextResponse('Rate limit exceeded', { status: 429 })
    // }

    // const hash = await generateHash(ip)
    // const dedupKey = `deduplicate:${hash}:${slug}`
    // const isNew = await redis.set(dedupKey, true, { nx: true, ex: 24 * 60 * 60 })

    // if (!isNew) {
    //   return new NextResponse('Duplicate request', { status: 202 })
    // }

    // const pageViewKey = `pageviews:projects:${slug}`
    // await redis.incr(pageViewKey)

    // increment the views in the database in prisma
    const blog = await db.blog.update({
      where: { slug },
      data: {
        views: {
          increment: 1,
        },
      },
    })

    // increment views for each tag in prisma
    const blogTags = blog.tagIds
    for (let i = 0; i < blogTags.length; i++) {
      const tagId = blogTags[i]
      // check if tag exists
      const tag = await db.tag.findUnique({
        where: { id: tagId },
      })
      // if tag does not exist, create it
      if (!tag) {
        const newTag = await db.tag.create({
          data: {
            name: slug,
            slug: slug,
          },
        })
      }
      await db.tag.update({
        where: { id: tagId },
        data: {
          views: {
            increment: 1,
          },
        },
      })
    }

    return new NextResponse('Request processed', { status: 202 })
  } catch (error) {
    console.error('Error processing request:', error)
    return new NextResponse('Internal server error', { status: 500 })
  }
}

// async function generateHash(input) {
//   const buf = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(input))
//   return Array.from(new Uint8Array(buf))
//     .map((b) => b.toString(16).padStart(2, '0'))
//     .join('')
// }
