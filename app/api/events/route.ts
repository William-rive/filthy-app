// /app/api/events/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import NextAuth from "next-auth";
import { authOptions } from "@/auth/authSetup";

const prisma = new PrismaClient();

export async function GET() {
  try {
    const events = await prisma.event.findMany();
    return NextResponse.json(events, { status: 200 });
  } catch (error) {
    console.error('Error fetching events:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  // Vérification admin
  const { auth } = NextAuth(authOptions);
  const session = await auth();
  const user = session?.user as { role?: string } | undefined;
  if (!user || user.role !== "admin") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { title, description, date, location } = await req.json();
    const event = await prisma.event.create({
      data: {
        title,
        description,
        date: new Date(date),
        location,
      },
    });
    return NextResponse.json(event, { status: 201 });
  } catch (error) {
    console.error('Error creating event:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

// (Pas de handler dynamique par id pour events, donc rien à changer ici)