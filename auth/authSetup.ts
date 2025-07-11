import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "../src/lib/prisma";
import GitHubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";

// Options d'authentification centralisées
export const authOptions = {
    adapter: PrismaAdapter(prisma),
    providers: [GitHubProvider, GoogleProvider],
    redirectProxyUrl: process.env.NEXTAUTH_URL,
    callbacks: {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        async session({ session, token }: any) {
            if (session.user && token && token.role) {
                session.user.role = token.role;
            }
            return session;
        },
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        async jwt({ token, user }: any) { 
            if (user) {
                token.role = user.role;
            }
            return token;
        },
    },
};

export const { handlers, signIn, signOut } = NextAuth(authOptions);