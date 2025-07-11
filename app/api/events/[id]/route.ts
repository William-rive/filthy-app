import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import NextAuth from "next-auth";
import { authOptions } from "@/auth/authSetup";

const prisma = new PrismaClient();

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  const { auth } = NextAuth(authOptions);
  const session = await auth();
  const user = session?.user as { role?: string } | undefined;
  if (!user || user.role !== "admin") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const id = Number(params.id);
    await prisma.event.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting event:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  const { auth } = NextAuth(authOptions);
  const session = await auth();
  const user = session?.user as { role?: string } | undefined;
  if (!user || user.role !== "admin") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const id = Number(params.id);
    const { title, description, date, location } = await req.json();
    const event = await prisma.event.update({
      where: { id },
      data: {
        title,
        description,
        date: new Date(date),
        location,
      },
    });
    return NextResponse.json(event);
  } catch (error) {
    console.error('Error updating event:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
