import NextAuth from "next-auth";
import { authOptions } from "../../auth/authSetup";
import { User } from "@prisma/client";
import { redirect } from "next/navigation";

const { auth } = NextAuth(authOptions);

export default async function ProfilePage() {
  const session = await auth();
  const user = session?.user as (User & { role: string }) | undefined;
  if (!user) {
    redirect("/");
  }

  // TODO: Fetch posts made by the user (API call)
  // const posts = await fetchUserPosts(user.id);

  return (
    <main className="max-w-2xl mx-auto py-10">
      <h1 className="text-3xl font-bold mb-4">Mon profil</h1>
      <div className="mb-6 p-4 bg-gray-100 rounded">
        <p><strong>Nom :</strong> {user.name}</p>
        <p><strong>Email :</strong> {user.email}</p>
        <p><strong>Rôle :</strong> {user.role}</p>
      </div>
      <h2 className="text-2xl font-bold mb-2">Mes posts</h2>
      <div className="bg-white p-4 rounded shadow">
        <p>Aucun post pour le moment.</p>
      </div>
    </main>
  );
}
