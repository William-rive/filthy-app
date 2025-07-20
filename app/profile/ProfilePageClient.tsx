"use client";
import { useState } from "react";
import EditNameForm from "./EditNameForm";
import { User } from "@prisma/client";

export default function ProfilePageClient({ user }: { user: User & { role: string } }) {
  const [editMode, setEditMode] = useState(false);
  return (
    <main className="max-w-2xl mx-auto py-10">
      <h1 className="text-3xl font-bold mb-4">Mon profil</h1>
      <div className="mb-6 p-4 bg-gray-100 rounded">
        <div className="flex items-center gap-1">
          <p><strong>Nom :</strong> {user.name}</p>
          <button
            type="button"
            aria-label="Modifier le nom"
            className=" p-1 rounded hover:bg-gray-300"
            onClick={() => setEditMode((v) => !v)}
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 text-gray-600">
              <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 3.487a2.25 2.25 0 1 1 3.182 3.182l-12.12 12.12a2 2 0 0 1-.878.513l-3.06.817a.5.5 0 0 1-.61-.61l.817-3.06a2 2 0 0 1 .513-.878l12.12-12.12z" />
            </svg>
          </button>
        </div>
        {editMode && (
          <div className="mt-2">
            <EditNameForm />
          </div>
        )}
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
