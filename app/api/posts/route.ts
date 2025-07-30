import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/src/lib/prisma';


export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get('userId');
  if (!userId) {
    return NextResponse.json({ error: 'userId is required' }, { status: 400 });
  }
  try {
    // Récupère le nom de l'utilisateur
    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user || !user.name) {
      return NextResponse.json({ error: 'User not found or has no name' }, { status: 404 });
    }
    // Récupère les posts classiques
    const posts = await prisma.post.findMany({
      where: { userId },
      include: {
        tune: { select: { name: true } },
        livery: { select: { name: true } },
      },
      orderBy: { createdAt: 'desc' },
    });
    // Récupère tous les tunes dont postedBy = nom de l'utilisateur
    const tunes = await prisma.tune.findMany({
      where: { postedBy: user.name },
      include: {
        tags: { include: { tag: true } },
      },
      orderBy: { createdAt: 'desc' },
    });
    // Récupère tous les liveries dont postedBy = nom de l'utilisateur
    const liveries = await prisma.livery.findMany({
      where: { postedBy: user.name },
      orderBy: { createdAt: 'desc' },
    });
    // Formate les tunes comme des posts de type 'tune'
    const tunePosts = tunes.map(tune => ({
      id: `tune-${tune.id}`,
      userId,
      type: 'tune',
      tuneId: tune.id,
      liveryId: null,
      createdAt: tune.createdAt,
      tune,
      livery: null,
    }));
    // Formate les liveries comme des posts de type 'livery'
    const liveryPosts = liveries.map(livery => ({
      id: `livery-${livery.id}`,
      userId,
      type: 'livery',
      tuneId: null,
      liveryId: livery.id,
      createdAt: livery.createdAt,
      tune: null,
      livery,
    }));
    // Fusionne et trie tous les posts par date
    const allPosts = [...posts, ...tunePosts, ...liveryPosts].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    return NextResponse.json(allPosts, { status: 200 });
  } catch (error) {
    console.error('Failed to fetch posts:', error);
    return NextResponse.json({ error: 'Failed to fetch posts' }, { status: 500 });
  }
}
