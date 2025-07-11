"use client";
import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import type { User } from "@prisma/client";

export default function AdminUsersClient({ users }: { users: User[] }) {
  const [pending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const router = useRouter();
  const { data: session } = useSession();
  const currentUser = session?.user as { role?: string } | undefined;

  async function handleRoleChange(userId: string, newRole: string) {
    setError(null);
    startTransition(async () => {
      const res = await fetch("/admin/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, newRole }),
      });
      if (!res.ok) {
        const data = await res.json();
        setError(data.error || "Erreur lors du changement de rôle");
      } else {
        router.refresh();
      }
    });
  }

  // Filtrage des utilisateurs selon la recherche
  const filteredUsers = users.filter(
    (user) =>
      user.name?.toLowerCase().includes(search.toLowerCase()) ||
      user.email?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <input
        type="text"
        placeholder="Rechercher par nom ou email..."
        className="mb-4 p-2 border rounded w-full max-w-xs"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <table className="w-full border mt-2">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-2">Nom</th>
            <th className="p-2">Email</th>
            <th className="p-2">Rôle</th>
            <th className="p-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.map((user) => (
            <tr key={user.id} className="border-t">
              <td className="p-2">{user.name}</td>
              <td className="p-2">{user.email}</td>
              <td className="p-2 font-mono">{user.role}</td>
              <td className="p-2">
                {currentUser?.role === "admin" && (
                  user.role === "user" ? (
                    <button
                      className="px-2 py-1 bg-yellow-400 rounded text-black hover:bg-yellow-500"
                      disabled={pending}
                      onClick={() => handleRoleChange(user.id, "admin")}
                    >
                      Promouvoir admin
                    </button>
                  ) : (
                    <button
                      className="px-2 py-1 bg-gray-300 rounded text-black hover:bg-gray-400"
                      disabled={pending}
                      onClick={() => handleRoleChange(user.id, "user")}
                    >
                      Rétrograder user
                    </button>
                  )
                )}
              </td>
            </tr>
          ))}
        </tbody>
        {error && (
          <tfoot>
            <tr>
              <td colSpan={4} className="text-red-600 p-2">
                {error}
              </td>
            </tr>
          </tfoot>
        )}
      </table>
    </div>
  );
}
