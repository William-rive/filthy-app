import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { UpdateData } from '@/models/UpdateData';


/**
 * @swagger
 * /tunes/{id}:
 *   get:
 *     summary: Récupérer un tune par ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID du tune
 *     responses:
 *       200:
 *         description: Tune récupéré avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                 name:
 *                   type: string
 *                 description:
 *                   type: string
 *       404:
 *         description: Tune non trouvé
 */

const prisma = new PrismaClient();

export async function GET(request: Request, context: { params: { id: string } }) {
    const { params } = context; // Access `params` from `context`
    const { id } = await params; // Await `params` to access its properties

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

export async function PATCH(request: Request, context: { params: { id: string } }) {
    const { params } = context; // Access `params` from `context`
    const { id } = await params; // Await `params` to access its properties

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

export async function DELETE(_: Request, { params }: { params: { id: string } }) {
    const { id } = params;

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