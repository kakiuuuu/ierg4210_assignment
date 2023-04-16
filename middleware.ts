import { NextRequest, NextResponse } from "next/server";

export async function middleware(req: NextRequest) {
  const homeUrl = new URL(`/`, process.env.NEXT_PUBLIC_BASE_URL)
  const loginUrl = new URL(`/login`, process.env.NEXT_PUBLIC_BASE_URL)
  const authUrl = new URL(`/api/auth/admin`, process.env.NEXT_PUBLIC_BASE_URL)
  const url = req.nextUrl;

  const token = req.cookies.get('auth');
  if (url.pathname.startsWith('/login') && token) {
    return NextResponse.redirect(homeUrl);
  }

  if (url.pathname.startsWith('/admin') || url.pathname.startsWith('/api/admin')) {
    if (!token) {
      return NextResponse.redirect(loginUrl);
    }
    try {
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

}