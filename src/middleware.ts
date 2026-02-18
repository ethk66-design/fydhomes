import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
    // `withAuth` augments your `Request` with the user's token.
    function middleware(_req) {
        // middleware logic if needed
        // The `withAuth` wrapper automatically checks for a valid session token
        // and redirects to the sign-in page if missing.
        return NextResponse.next();
    },
    {
        callbacks: {
            authorized: ({ token, req }) => {
                // Allow access to login page without token
                if (req.nextUrl.pathname === "/admin/login") {
                    return true;
                }
                // Only allow if token exists (user is logged in) for other admin routes
                return !!token;
            },
        },
        pages: {
            signIn: "/admin/login",
        },
    }
);

export const config = {
    matcher: [
        // Protect all routes under /admin
        "/admin/:path*",
    ],
};
