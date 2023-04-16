import { NextResponse } from 'next/server'
import { prisma } from '@/prisma/client';
import { sign } from "jsonwebtoken";
import * as bcrypt from 'bcrypt';

const secret = process.env.JWT_SECRET!;

export async function POST(
  req: Request,
) {
  try {
    const { username, password } = await req.json();
    const userRc = await prisma.user.findUnique({
      where: {
        username
      }
    })
    if (!userRc) {
      return NextResponse.json({ error: "User not found" }, {
        status: 404,
      });
    }
    if (!(await bcrypt.compare(password, userRc.pw))) {
      return NextResponse.json({ error: "Password is incorrect" }, {
        status: 401,
      });
    }
    const token = sign(
      {
        exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 3, // 3 days
        username: username,
        admin: userRc.admin,
      },
      secret,
    );


    let response = NextResponse.json({ id:userRc.id, username:userRc.username, admin:userRc.admin }, {
      status: 200,
    });
    response.cookies.set({
      name: 'auth',
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV !== "development",
      sameSite : "strict",
      maxAge: 60 * 60 * 24 * 3, // 3 days
      path: "/",
    });
    return response;

    
  } catch (error) {
    return NextResponse.json(error)
  }
}
