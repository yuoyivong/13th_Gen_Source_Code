import { NextResponse, type NextRequest } from "next/server";
import { auth } from "./auth";

export const middleware = async (request: NextRequest) => {
  const session = await auth();

  if (!session) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
};

export const config = {
  matcher: ["/", "/todo/:path*"],
};
