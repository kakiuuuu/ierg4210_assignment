import { NextRequest, NextResponse } from 'next/server'
export async function POST(
  req: NextRequest,
) {
  try {
    const token = req.cookies.get('auth')
    if (!token) {
      return NextResponse.json({ message: "Bro you are already not logged in..." });
    } else {
    let res = NextResponse.json({ message: "Logout Success!" }, {
      status: 200,
    });

    res.cookies.set({
      name: 'auth',
      value: '',
      httpOnly: true,
      secure: process.env.NODE_ENV !== "development",
      sameSite : "strict",
      maxAge: -1,
      path: "/",
    });
    return res

  }
  } catch (error) {
    return NextResponse.json(error)
  }
}
