import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../../../src/lib/prisma";
import NextAuth from "next-auth";
import { authOptions } from "../../../../auth/authSetup";

export async function POST(req: NextRequest) {
  // Utilisation de la fonction auth() pour NextAuth v5
  const { auth } = NextAuth(authOptions);
  const session = await auth();
  const user = session?.user as { role?: string } | undefined;
  if (!user || user.role !== "admin") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { userId, newRole } = await req.json();
  if (!userId || !["user", "admin"].includes(newRole)) {
    return NextResponse.json({ error: "Invalid data" }, { status: 400 });
  }

  const updated = await prisma.user.update({
    where: { id: userId },
    data: { role: newRole },
    select: { id: true, role: true },
  });

  return NextResponse.json({ success: true, user: updated });
}
