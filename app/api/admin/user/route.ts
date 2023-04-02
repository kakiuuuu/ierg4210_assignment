import { NextResponse } from 'next/server'
import { prisma } from '@/prisma/client';

export async function POST(
  request: Request,
) {
  try {
    const body = await request.json();
    const { username, email, pw, admin } = body
    const postUser = await prisma.user.create({
      data: {
        username,
        email,
        pw,
        salt: '',
        admin: true
      }
    })
    return NextResponse.json(postUser);
  } catch (error) {
    return NextResponse.json(error)
  }
}