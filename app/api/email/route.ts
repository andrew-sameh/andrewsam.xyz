import { NotionMagicLinkEmail } from '@/emails/notion-magic-link'
import { Resend } from 'resend'
import { render } from '@react-email/render'
import { env } from '@/env.mjs'

const resend = new Resend(env.RESEND_TOKEN)

export async function POST() {
  try {
    const { data, error } = await resend.emails.send({
      from: 'Acme <onboarding@resend.dev>',
      to: ['delivered@resend.dev'],
      subject: 'Hello world',
      html: render(NotionMagicLinkEmail({ loginCode: 'John' })),
    })

    if (error) {
      return Response.json({ error }, { status: 500 })
    }

    return Response.json(data)
  } catch (error) {
    return Response.json({ error }, { status: 500 })
  }
}
