import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
    const { id } = await params;

    try {
        const tune = await prisma.tune.findUnique({
            where: { id },
            include: {
                tags: {
                    include: {
                        tag: true,
                    },
                },
            },
        });

        if (!tune) {
            return NextResponse.json({ error: 'Tune not found' }, { status: 404 });
        }

        return NextResponse.json(tune, { status: 200 });
    } catch (error) {
        console.error('Failed to fetch tune:', error);
        return NextResponse.json({ error: 'Failed to fetch tune' }, { status: 500 });
    }
}