import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/prisma/client';
import * as bcrypt from 'bcrypt';

export async function PUT(
  req: NextRequest,
) {
  try {
    const { id, password, newPassword } = await req.json();
    const userRc = await prisma.user.findUnique({
      where: {
        id
      }
    })
    if (!userRc) {
      return NextResponse.json({ error: "User not found" }, {
        status: 404,
      });
    }
    if (!(await bcrypt.compare(password, userRc.pw))) {
      return NextResponse.json({ error: "The Current Password is incorrect" }, {
        status: 401,
      });
    }
    const token = req.cookies.get('auth')
    if (!token) {
      return NextResponse.json({ message: "Bro you are already not logged in..." });
    } else {
      const hashedPassword = await bcrypt.hash(newPassword, 10);
      await prisma.user.update({
        where: {
          id
        },
        data: {
          pw: hashedPassword
        }
      })
      let res = NextResponse.json({ message: "Change Password Success!" }, {
        status: 200,
      });

      res.cookies.set({
        name: 'auth',
        value: '',
        httpOnly: true,
        secure: process.env.NODE_ENV !== "development",
        sameSite: "strict",
        maxAge: -1,
        path: "/",
      });
      return res

    }
  } catch (error) {
    return NextResponse.json(error)
  }
}
