import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest): NextResponse {
  // Get the pathname from the request
  const pathname = req.nextUrl.pathname;

  // Create a response and set the 'x-pathname' header
  const response = NextResponse.next();
  response.headers.set("x-pathname", pathname);

  // Return the response with the updated header
  return response;
}

// Optionally, define a matcher for specific routes
export const config = {
  matcher: "/:path*", // This applies to all paths; adjust as needed
};
