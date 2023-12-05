import { getToken } from "next-auth/jwt"
import { NextRequest, NextResponse } from "next/server"

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  const token = await getToken({ req: request })

  const baseUrl = request.nextUrl.origin + "/" // http://localhost:3000/
  const loginPage = "/auth/login"
  const unauthorizePage = "/unauthorize"

  // IF USER IS ALREADY LOGGED IN then we protect this paths from users
  const protectedSessionPath = [loginPage, "/register"]
  const isMatch = protectedSessionPath.some(path => pathname.startsWith(path))
  if (isMatch) {
    if (token) {
      return NextResponse.rewrite(new URL(`/404`, request.url))
    }
  }

  // // PROTECT ROOT PATH ONLY ex: http://localhost:3000/
  // if (!token && request.url === baseUrl) {
  //   const url = new URL(loginPage, request.url)
  //   return NextResponse.redirect(url)
  // }

  //   ADMIN MIDDLEWARE
  const protectedAdminPath = ["/admin"]

  if (isProtectedPathMatched(protectedAdminPath)) {
    if (!token) {
      const url = new URL(loginPage, request.url)
      url.searchParams.set("callbackUrl", encodeURI(request.url))
      return NextResponse.redirect(url)
    }
    if (token.role !== "admin") {
      const url = new URL(unauthorizePage, request.url)
      return NextResponse.rewrite(url)
    }
  }

  //   USER MIDDLEWARE
  const protectedUserPath = ["/app"]

  if (isProtectedPathMatched(protectedUserPath)) {
    if (!token) {
      const url = new URL(loginPage, request.url)
      url.searchParams.set("callbackUrl", encodeURI(request.url))
      return NextResponse.redirect(url)
    }
  }

  /**
   *  IS PROTECTED PATH MATCHED FUNCTION
   * */
  function isProtectedPathMatched(paths: string[]) {
    const isMatch = paths.some(path => pathname.startsWith(path))
    if (isMatch) return true
    return false
  }

  return NextResponse.next()
}
