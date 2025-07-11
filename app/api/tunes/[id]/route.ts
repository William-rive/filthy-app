import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { UpdateData } from '@/models/UpdateData';
import NextAuth from 'next-auth';
import { authOptions } from '@/auth/authSetup';

const prisma = new PrismaClient();

export async function GET(
    request: Request,
  { params }: { params: { id: string } }
) {
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

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
    const { id } = await params;

    // Vérification admin
    const { auth } = NextAuth(authOptions);
    const session = await auth();
    const user = session?.user as { role?: string } | undefined;
    if (!user || user.role !== 'admin') {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    try {
        const payload = await request.json();

        if (!payload || typeof payload !== 'object') {
            return NextResponse.json(
                { error: 'Invalid payload. Expected a JSON object.' },
                { status: 400 }
            );
        }

        const { name, description, code, postedBy, tags } = payload;

        if (!name && !description && !code && !postedBy && !tags) {
            return NextResponse.json(
                { error: 'At least one field must be provided for update.' },
                { status: 400 }
            );
        }

        const updateData: UpdateData = {};
        if (name) updateData.name = name;
        if (description) updateData.description = description;
        if (code) updateData.code = code;
        if (postedBy) updateData.postedBy = postedBy;
        if (tags && Array.isArray(tags)) {
            updateData.tags = {
                deleteMany: {},
                create: tags.map((tag: string) => ({
                    tag: {
                        connectOrCreate: {
                            where: { name: tag },
                            create: { name: tag },
                        },
                    },
                })),
            };
        }

        const updatedTune = await prisma.tune.update({
            where: { id },
            data: {
                ...updateData,
                updatedAt: new Date(),
            },
            include: {
                tags: {
                    include: {
                        tag: true,
                    },
                },
            },
        });

        return NextResponse.json(updatedTune, { status: 200 });
    } catch (error) {
        console.error('Failed to update tune:', error);
        return NextResponse.json({ error: 'Failed to update tune' }, { status: 500 });
    }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
    const { id } = await params;

    // Vérification admin
    const { auth } = NextAuth(authOptions);
    const session = await auth();
    const user = session?.user as { role?: string } | undefined;
    if (!user || user.role !== 'admin') {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    try {
        await prisma.tune.delete({
            where: { id },
        });

        return NextResponse.json({ message: 'Tune deleted successfully' });
    } catch (error) {
        console.error('Failed to delete tune:', error);
        return NextResponse.json({ error: 'Failed to delete tune' }, { status: 500 });
    }
}