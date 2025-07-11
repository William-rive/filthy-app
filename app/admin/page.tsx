import NextAuth from "next-auth";
import { authOptions } from "../../auth/authSetup";
import { redirect } from "next/navigation";
import { User } from "@prisma/client";
import Link from "next/link";

const { auth } = NextAuth(authOptions);

export default async function AdminPage() {
  // Sécurité côté serveur (double vérification du rôle)
  const session = await auth();
  // On s'assure que le typage correspond bien au modèle Prisma User
  const user = session?.user as (User & { role: string }) | undefined;
  if (!user || user.role !== "admin") {
    redirect("/");
  }

  return (
    <main className="max-w-2xl mx-auto py-10">
      <h1 className="text-3xl font-bold mb-4">Admin Panel</h1>
      <p className="mb-6">Bienvenue, administrateur !</p>
      <ul className="list-none space-y-2">
        <li>
          <Link href="/admin/users" className="text-blue-600 underline hover:text-blue-800">Gestion des utilisateurs</Link>
        </li>
        <li>Statistiques du site</li>
      </ul>
    </main>
  );
}
