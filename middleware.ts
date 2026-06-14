import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  if (request.nextUrl.pathname === '/') return NextResponse.next()

  const password = process.env.SITE_PASSWORD
  if (!password) return NextResponse.next()

  const username = process.env.SITE_USERNAME

  const authHeader = request.headers.get('authorization')
  if (authHeader?.startsWith('Basic ')) {
    const credentials = Buffer.from(authHeader.slice(6), 'base64').toString()
    const colonIndex = credentials.indexOf(':')
    const user = credentials.slice(0, colonIndex)
    const pass = credentials.slice(colonIndex + 1)
    if ((!username || user === username) && pass === password) return NextResponse.next()
  }

  return new NextResponse('Authentication Required', {
    status: 401,
    headers: {
      'WWW-Authenticate': 'Basic realm="Modelplane Preview", charset="UTF-8"',
    },
  })
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|logo-inverted\\.svg).*)'],
}
