import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "../src/lib/prisma";
import GitHubProvider from "next-auth/providers/github";
import Google from "next-auth/providers/google";

// Setup NextAuth avec PrismaAdapter et les providers GitHub et Google
export const { auth, handlers, signIn, signOut } = NextAuth ({
    adapter :  PrismaAdapter(prisma),
    providers: [GitHubProvider, Google],
})