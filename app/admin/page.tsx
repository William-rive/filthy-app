import NextAuth from "next-auth";
import { authOptions } from "../../auth/authSetup";
import { redirect } from "next/navigation";
import { User } from "@prisma/client";

const { auth } = NextAuth(authOptions);

export default async function AdminPage() {
  // Sécurité côté serveur (double vérification du rôle)
  const session = await auth();
  console.log("Session:", session);
  // On s'assure que le typage correspond bien au modèle Prisma User
  const user = session?.user as (User & { role: string }) | undefined;
  if (!user || user.role !== "admin") {
    redirect("/");
  }

  return (
    <main className="max-w-2xl mx-auto py-10">
      <h1 className="text-3xl font-bold mb-4">Admin Panel</h1>
      <p className="mb-6">Bienvenue, administrateur !</p>
      {/* Debug session (à retirer en prod) */}
      <pre className="bg-gray-100 text-xs p-2 mb-4 border rounded">{JSON.stringify(session, null, 2)}</pre>
      {/* Ajoutez ici vos outils d'administration */}
      <ul className="list-disc pl-5">
        <li>Gestion des utilisateurs</li>
        <li>Modération des contenus</li>
        <li>Statistiques du site</li>
        {/* ... */}
      </ul>
    </main>
  );
}
