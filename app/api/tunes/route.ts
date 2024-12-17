import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url);
    const name = searchParams.get('name');

    try {
        const tunes = name
            ? await prisma.tune.findMany({
                  where: {
                      name: {
                          contains: name,
                          mode: 'insensitive',
                      },
                  },
                  include: {
                      tags: {
                          include: {
                              tag: true,
                          },
                      },
                  },
              })
            : await prisma.tune.findMany({
                  include: {
                      tags: {
                          include: {
                              tag: true,
                          },
                      },
                  },
              });
        return NextResponse.json(tunes, { status: 200 });
    } catch (error) {
        console.error('Failed to fetch tunes:', error);
        return NextResponse.json({ error: 'Failed to fetch tunes' }, { status: 500 });
    }
}

export async function POST(req: NextRequest) {
    const { name, description, code, postedBy, tags } = await req.json();

    try {
        const tune = await prisma.tune.create({
            data: {
                name,
                description,
                code,
                postedBy,
                tags: {
                    create: tags.map((tag: string) => ({
                        tag: {
                            connectOrCreate: {
                                where: { name: tag },
                                create: { name: tag },
                            },
                        },
                    })),
                },
            },
            include: {
                tags: {
                    include: {
                        tag: true,
                    },
                },
            },
        });
        return NextResponse.json(tune, { status: 201 });
    } catch (error) {
        console.error('Failed to add tune:', error);
        return NextResponse.json({ error: 'Failed to add tune' }, { status: 500 });
    }
}

export async function PUT(req: NextRequest) {
    const { id, name, description, code, postedBy, tags } = await req.json();

    try {
        const tune = await prisma.tune.update({
            where: { id },
            data: {
                name,
                description,
                code,
                postedBy,
                tags: {
                    deleteMany: {},
                    create: tags.map((tag: string) => ({
                        tag: {
                            connectOrCreate: {
                                where: { name: tag },
                                create: { name: tag },
                            },
                        },
                    })),
                },
            },
            include: {
                tags: {
                    include: {
                        tag: true,
                    },
                },
            },
        });
        return NextResponse.json(tune, { status: 200 });
    } catch (error) {
        console.error('Failed to update tune:', error);
        return NextResponse.json({ error: 'Failed to update tune' }, { status: 500 });
    }
}

export async function DELETE(req: NextRequest) {
    const { id } = await req.json();

    try {
        await prisma.tune.delete({
            where: { id },
        });
        return NextResponse.json({}, { status: 204 });
    } catch (error) {
        console.error('Failed to delete tune:', error);
        return NextResponse.json({ error: 'Failed to delete tune' }, { status: 500 });
    }
}