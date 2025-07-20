import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../../../src/lib/prisma";
import NextAuth from "next-auth";
import { authOptions } from "../../../../auth/authSetup";


export async function PATCH(req: NextRequest) {
  const { auth } = NextAuth(authOptions);
  const session = await auth();
  const adminUser = session?.user as { id?: string; role?: string } | undefined;
  if (!adminUser || adminUser.role !== "admin") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const { userId, newRole } = await req.json();
  // Sécurise la valeur du rôle à "admin" ou "user" uniquement
  if (!userId || !["user", "admin"].includes(newRole)) {
    return NextResponse.json({ error: "Invalid data" }, { status: 400 });
  }
  try {
    // Met à jour le rôle dans le modèle User
    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: { role: newRole },
      select: { id: true, name: true, email: true, role: true },
    });
    return NextResponse.json({ success: true, user: updatedUser });
  } catch (error) {
    // Ajoute un log et retourne un JSON explicite
    console.error("PATCH error:", error);
    return NextResponse.json({ error: "Erreur lors de la mise à jour du rôle", details: String(error) }, { status: 500 });
  }
}
