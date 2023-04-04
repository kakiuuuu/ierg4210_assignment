import { NextRequest, NextResponse } from 'next/server'
import { verify } from "jsonwebtoken";

export async function POST(
  req: NextRequest,
) {
  try {
    const { token }: { token: string } = await req.json()
    const decode = verify(token, process.env.JWT_SECRET!) as any

    console.log('decode>>>>>', decode)
    if (!decode.admin) {
      return NextResponse.json({ error: "User not admin" }, {
        status: 404,
      });
    }
    return NextResponse.json({ message: 'Admin auth susses' }, {
      status: 200,
    });
  } catch (error) {
    return NextResponse.json({ error }, { status: 401, })
  }
}
