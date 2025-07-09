import NextAuth from "next-auth";
import auth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "../src/lib/prisma";
import GitHubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";

// Options d'authentification centralisées
export const authOptions = {
    adapter: PrismaAdapter(prisma),
    providers: [GitHubProvider, GoogleProvider],
    redirectProxyUrl: process.env.NEXTAUTH_URL,
};

// Export des handlers et helpers
export const { handlers, signIn, signOut } = NextAuth(authOptions);
export { auth }; // Ré-export de 'auth' pour compatibilité avec les Server Components

// Pour les Server Components :
export { default as getServerSession } from "next-auth";