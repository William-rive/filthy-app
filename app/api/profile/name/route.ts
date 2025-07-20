import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/src/lib/prisma";
import NextAuth from "next-auth";
import { authOptions } from "@/auth/authSetup";

export async function PATCH(req: NextRequest) {
  const { auth } = NextAuth(authOptions);
  const session = await auth();
  const user = session?.user as { id?: string } | undefined;
  if (!user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const { name } = await req.json();
  if (!name || typeof name !== "string" || name.length < 2) {
    return NextResponse.json({ error: "Nom invalide" }, { status: 400 });
  }
  try {
    await prisma.user.update({
      where: { id: user.id },
      data: { name },
    });
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Erreur lors de la mise à jour" }, { status: 500 });
  }
}
