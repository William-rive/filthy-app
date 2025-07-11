import getServerSession from "next-auth";
import { authOptions } from "../../../auth/authSetup";
import { prisma } from "../../../src/lib/prisma";
import { redirect } from "next/navigation";
import AdminUsersClient from "./AdminUsersClient";
import { User } from "@prisma/client";

export default async function AdminUsersPage() {
  // Sécurité admin
  const session = await getServerSession(authOptions);
  const role = (session as { user?: { role?: string } })?.user?.role;
  if (!role || role !== "admin") {
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
