import { NextRequest, NextResponse } from "next/server";

export async function middleware(req: NextRequest) {
  const token = req.cookies.get('auth');
  if (!token) {
    const url = new URL(`/login`, req.url);
    return NextResponse.redirect(url);
  }

  let authUrl = new URL('api/auth/admin', req.nextUrl.origin)
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
    return NextResponse.redirect(new URL(`/`, req.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
}