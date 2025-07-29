import { NextResponse } from "next/server";
import { prisma } from "../../../../src/lib/prisma";

export async function GET(req: Request, { params }: { params: { id: string } }) {
  // Décodage du nom encodé dans l'URL
  const decodedName = decodeURIComponent(params.id);
  const user = await prisma.user.findFirst({
    where: { name: decodedName },
    select: { id: true, name: true, email: true, role: true },
  });
  if (!user) {
    return NextResponse.json({ error: "Utilisateur non trouvé" }, { status: 404 });
  }
  return NextResponse.json(user);
}
