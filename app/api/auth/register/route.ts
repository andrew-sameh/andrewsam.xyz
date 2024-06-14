import bcrypt from 'bcryptjs'

import { db } from '@/lib/prisma'

export async function POST(req, res) {
  try {
    const requestBody = await req.json()
    const { name, email, password, roleId } = requestBody

    const emailLower = email.toLowerCase()
    const whitelistedRoles = ['user']

    // Check if user already exists
    if (!whitelistedRoles.includes(roleId)) {
      return new Response(JSON.stringify({ message: 'Invalid Role' }), { status: 401 })
    }

    const existingUser = await db.user.findUnique({
      where: { email: emailLower },
    })

    if (existingUser) {
      return new Response(JSON.stringify({ message: 'User already exists!' }), { status: 409 })
    }

    // Hash the password
    const hashedPassword = bcrypt.hashSync(password, 10)
    // Prepare user data, excluding undefined fields
    const userData = {
      name,
      email: emailLower,
      password: hashedPassword,
    }

    // Create new user
    const user = await db.user.create({ data: userData })

    return new Response(JSON.stringify(user), { status: 201 })
  } catch (e) {
    return new Response(JSON.stringify({ message: 'Something went wrong' }), { status: 500 })
  }
}
