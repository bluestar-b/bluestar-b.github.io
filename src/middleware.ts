import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const redirects: Record<string, string> = {
  'instagram': 'https://instagram.com/bluestar.pics',
  
}

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname
  const id = path.substring(1)

  if (redirects[id]) {
    return NextResponse.rewrite(new URL(redirects[id]))
  }

  return NextResponse.next()
}
