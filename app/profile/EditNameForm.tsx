"use client";
import { useState } from "react";
import { useSession } from "next-auth/react";
import { toast } from "react-hot-toast";

export default function EditNameForm() {
  const { data: session, update } = useSession();
  const [name, setName] = useState(session?.user?.name || "");
  const [pending, setPending] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setPending(true);
    const res = await fetch("/api/profile/name", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name }),
    });
    const data = await res.json();
    setPending(false);
    if (res.ok) {
      toast.success("Nom mis à jour !");
      update(); // refresh session
    } else {
      toast.error(data.error || "Erreur lors de la mise à jour");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="mb-4 flex gap-2 items-center">
      <input
        type="text"
        value={name}
        onChange={e => setName(e.target.value)}
        className="px-2 py-1 border rounded"
        placeholder="Nouveau nom"
        disabled={pending}
      />
      <button
        type="submit"
        className="px-4 py-1 bg-blue-500 text-white rounded"
        disabled={pending || !name.trim()}
      >
        Modifier
      </button>
    </form>
  );
}
