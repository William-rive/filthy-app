import getServerSession from "next-auth";
import { authOptions } from "../../auth/authSetup";
import { redirect } from "next/navigation";

type SessionWithRole = {
  user?: {
    role?: string;
  };
};

export default async function AdminPage() {
  // Sécurité côté serveur (double vérification du rôle)
  const session = await getServerSession(authOptions);
  const role = (session as SessionWithRole)?.user?.role;
  if (!role || role !== "admin") {
    redirect("/");
  }

  return (
    <main className="max-w-2xl mx-auto py-10">
      <h1 className="text-3xl font-bold mb-4">Admin Panel</h1>
      <p className="mb-6">Bienvenue, administrateur !</p>
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
