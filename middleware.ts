import { NextRequest, NextResponse } from "next/server";

export async function middleware(req: NextRequest) {
  const homeUrl = new URL(`/`, process.env.NEXT_PUBLIC_BASE_URL)
  const loginUrl = new URL(`/login`, process.env.NEXT_PUBLIC_BASE_URL)
  const authUrl = new URL(`/api/auth/admin`, process.env.NEXT_PUBLIC_BASE_URL)

  const token = req.cookies.get('auth');
  if (!token) {
    return NextResponse.redirect(loginUrl);
  }
  try {
    console.log('authUrl>>>>>>', authUrl.toString())
    const isAdmin = await fetch(authUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ token: token.value }),
    })
    let res = await isAdmin.json()
    console.log('res>>>>>>', res)
    if (!isAdmin.ok) {
      return NextResponse.redirect(homeUrl);
    }
    return NextResponse.next();
  } catch (error) {
    console.log({error}); 
    return NextResponse.redirect(homeUrl);
  }

}

export const config = {
  matcher: ['/admin/:path*'],
}