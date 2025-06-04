import { NextResponse, type NextRequest } from "next/server";
import { auth } from "./auth";

export const middleware = async (request: NextRequest) => {
  try {
    const session = await auth();
    const currentTime = new Date();

    // check if session exists
    if (!session) {
      return NextResponse.redirect(new URL("/login", request.url));
    }

    // check if session exists
    if (!session || !session.user) {
      return NextResponse.redirect(new URL("/login", request.url));
    }

    // check is the session expires
    if (session.expires) {
      const sessionExpiration = new Date(session.expires);
      if (sessionExpiration <= currentTime) {
        const response = NextResponse.redirect(new URL("/login", request.url));
        response.cookies.delete("authjs.session-token");
        return response;
      }
    }

    return NextResponse.next();
  } catch (error) {
    const response = NextResponse.redirect(new URL("/login", request.url));
    response.cookies.delete("authjs.session-token");
    return response;
  }
};

export const config = {
  matcher: ["/romantic-date", "/profile"],
};
