import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { UpdateData } from '@/models/UpdateData';

const prisma = new PrismaClient();

export async function GET(request: Request, context: { params: { id: string } }) {
    const { params } = context;
    const { id } = await params;

    try {
        const livery = await prisma.livery.findUnique({
            where: { id },
            include: {
                tags: {
                    include: {
                        tag: true,
                    },
                },
            },
        });

        if (!livery) {
            return NextResponse.json({ error: 'Livery not found' }, { status: 404 });
        }

        return NextResponse.json(livery, { status: 200 });
    } catch (error) {
        console.error('Failed to fetch livery:', error);
        return NextResponse.json({ error: 'Failed to fetch livery' }, { status: 500 });
    }
}

export async function PATCH(request: Request, context: { params: { id: string } }) {
    const { params } = context;
    const { id } = await params;

    try {
        const payload = await request.json();

        if (!payload || typeof payload !== 'object') {
            return NextResponse.json(
                { error: 'Invalid payload. Expected a JSON object.' },
                { status: 400 }
            );
        }

        const { name, description, image, postedBy, tags } = payload;

        if (!name && !description && !image && !postedBy && !tags) {
            return NextResponse.json(
                { error: 'At least one field must be provided for update.' },
                { status: 400 }
            );
        }

        const updateData: UpdateData = {};
        if (name) updateData.name = name;
        if (description) updateData.description = description;
        if (image) updateData.image = image;
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

        const updatedLivery = await prisma.livery.update({
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

        return NextResponse.json(updatedLivery, { status: 200 });
    } catch (error) {
        console.error('Failed to update livery:', error);
        return NextResponse.json({ error: 'Failed to update livery' }, { status: 500 });
    }
}

export async function DELETE(_: Request, { params }: { params: { id: string } }) {
    const { id } = params;

    try {
        await prisma.livery.delete({
            where: { id },
        });

        return NextResponse.json({ message: 'Livery deleted successfully' });
    } catch (error) {
        console.error('Failed to delete livery:', error);
        return NextResponse.json({ error: 'Failed to delete livery' }, { status: 500 });
    }
}