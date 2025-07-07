import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url);
    const name = searchParams.get('name');

    try {
        const liveries = name
            ? await prisma.livery.findMany({
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
            : await prisma.livery.findMany({
                  include: {
                      tags: {
                          include: {
                              tag: true,
                          },
                      },
                  },
              });
        return NextResponse.json(liveries, { status: 200 });
    } catch (error) {
        console.error('Failed to fetch liveries:', error);
        return NextResponse.json({ error: 'Failed to fetch liveries' }, { status: 500 });
    }
}

export async function POST(request: Request) {
    const { name, description, image, postedBy, tags } = await request.json();

    try {
        const transformedTags = Array.isArray(tags)
            ? tags.map((tag: string) => ({
                  tag: {
                      connectOrCreate: {
                          where: { name: tag },
                          create: { name: tag },
                      },
                  },
              }))
            : [];

        const livery = await prisma.livery.create({
            data: {
                name,
                description,
                image,
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
        return NextResponse.json(livery, { status: 201 });
    } catch (error) {
        console.error('Failed to create livery:', error);
        return NextResponse.json({ error: 'Failed to create livery' }, { status: 500 });
    }
}