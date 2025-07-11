import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(req: NextRequest) {
    const { pathname } = req.nextUrl;

    // Protéger uniquement les routes /admin
    if (pathname.startsWith("/admin")) {
        const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
        if (!token || token.role !== "admin") {
            // Redirige vers la page d'accueil si non admin
            return NextResponse.redirect(new URL("/", req.url));
        }
    }

    return NextResponse.next();
}

// Middleware pour Next.js qui utilise NextAuth pour la gestion de l'authentification
export const config = {
    matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
}