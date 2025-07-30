import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/src/lib/prisma';
import NextAuth from 'next-auth';
import { authOptions } from '@/auth/authSetup';


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

export async function POST(request: NextRequest) {
    const { auth } = NextAuth(authOptions);
    const session = await auth();
    const user = session?.user as { id?: string, name?: string } | undefined;
    if (!user?.id) {
        return NextResponse.json({ error: 'Unauthorized: no user session' }, { status: 401 });
    }
    const userId = user.id;
    const userName = user.name || '';
    const { name, description, code, tags } = await request.json();

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
                postedBy: userName,
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
        await prisma.post.create({
            data: {
                userId,
                type: 'tune',
                tuneId: tune.id,
            },
        });
        return NextResponse.json(tune, { status: 201 });
    } catch (error) {
        console.error('Failed to create tune:', error);
        return NextResponse.json({ error: 'Failed to create tune' }, { status: 500 });
    }
}