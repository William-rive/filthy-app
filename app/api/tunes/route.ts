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

export async function POST(request: Request) {
    const { name, description, code, postedBy, tags } = await request.json();

    try {
        const transformedTags = tags.map((tag: string) => ({
            tag: {
                connectOrCreate: {
                    where: { name: tag },
                    create: { name: tag },
                },
            },
        }));

        const tune = await prisma.tune.create({
            data: {
                name,
                description,
                code,
                postedBy,
                tags: {
                    create: transformedTags,
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
        console.error('Failed to create tune:', error);
        return NextResponse.json({ error: 'Failed to create tune' }, { status: 500 });
    }
}