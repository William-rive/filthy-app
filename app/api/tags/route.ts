import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
    try {
        const tags = await prisma.tag.findMany();
        return NextResponse.json(tags, { status: 200 });
    } catch (error) {
        console.error('Failed to fetch tags:', error);
        return NextResponse.json({ error: 'Failed to fetch tags' }, { status: 500 });
    }
}

export async function POST(req: NextRequest) {
    const { name } = await req.json();

    try {
        const tag = await prisma.tag.create({
            data: { name },
        });
        return NextResponse.json(tag, { status: 201 });
    } catch (error) {
        console.error('Failed to add tag:', error);
        return NextResponse.json({ error: 'Failed to add tag' }, { status: 500 });
    }
}