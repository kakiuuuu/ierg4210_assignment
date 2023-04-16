import { NextResponse } from 'next/server'
import { prisma } from '@/prisma/client';
import * as bcrypt from 'bcrypt';

export async function POST(
  request: Request,
) {
  try {
    const body = await request.json();
    const { username, email, pw, admin } = body
    const hashedPassword = await bcrypt.hash(pw, 10);
    const postUser = await prisma.user.create({
      data: {
        username,
        email,
        pw: hashedPassword,
        salt: '',
        admin
      }
    })
    return NextResponse.json(postUser);
  } catch (error) {
    return NextResponse.json(error)
  }
}