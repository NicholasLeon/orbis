import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function proxy(request: NextRequest) {
  const session = request.cookies.get('session');
  const { pathname } = request.nextUrl;

  if (!session && pathname === '/dashboard') {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  if (session && (pathname === '/login' || pathname === '/register')) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*', '/login', '/register'],
}