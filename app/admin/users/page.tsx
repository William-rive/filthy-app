import { authOptions } from "../../../auth/authSetup";
import { prisma } from "../../../src/lib/prisma";
import { redirect } from "next/navigation";
import AdminUsersClient from "./AdminUsersClient";
import { User } from "@prisma/client";
import NextAuth from "next-auth";

export default async function AdminUsersPage() {
  // Utilisation de la fonction auth() pour NextAuth v5
  const { auth } = NextAuth(authOptions);
  const session = await auth();
  const user = session?.user as (User & { role: string }) | undefined;
  if (!user || user.role !== "admin") {
    redirect("/");
  }

  // Récupérer tous les utilisateurs
  const users: User[] = await prisma.user.findMany({
    orderBy: { email: "asc" },
  });

  return (
    <main className="max-w-2xl mx-auto py-10">
      <h1 className="text-2xl font-bold mb-6">Gestion des utilisateurs</h1>
      <AdminUsersClient users={users} />
    </main>
  );
}
