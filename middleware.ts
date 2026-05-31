import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(req: NextRequest) {
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
    const path = req.nextUrl.pathname;

    const isAuthPage = path === "/login";
    const isDashboard = path === "/dashboard" || path.startsWith("/dashboard/");
    const isRoot = path === "/";

    // Redirect root to dashboard
    if (isRoot) {
        return NextResponse.redirect(new URL("/dashboard", req.url));
    }

    // Redirect authenticated users away from login
    if (isAuthPage && token) {
        return NextResponse.redirect(new URL("/dashboard", req.url));
    }

    // Protect dashboard routes
    if (isDashboard && !token) {
        return NextResponse.redirect(new URL("/login", req.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
