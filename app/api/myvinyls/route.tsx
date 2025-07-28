import { NextRequest, NextResponse } from 'next/server';
import schema from './schema';
import { prisma } from '@/prisma/client';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const validation = schema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json(
        { errors: validation.error.issues },
        { status: 400 }
      );
    }

    const exists = await prisma.myVinyls.findFirst({
      where: {
        author: body.author,
        title: body.title,
      },
    });

    if (exists) {
      return NextResponse.json(
        { error: 'Ez a bakelit már szerepel az adatbázisban.' },
        { status: 409 }
      ); // 409 Conflict
    }

    const myvinyls = await prisma.myVinyls.create({
      data: {
        author: body.author,
        title: body.title,
      },
    });

    return NextResponse.json(myvinyls, { status: 201 });
  } catch (error) {
    console.error('POST API hiba:', error);
    return NextResponse.json({ error: 'Szerverhiba történt' }, { status: 500 });
  }
}




export async function GET(request: NextRequest) {
  try {
    const { searchParams } = request.nextUrl;
    const author = searchParams.get('author') || undefined;
    const title = searchParams.get('title') || undefined;

    const validation = schema.safeParse({ author, title });
    if (!validation.success) {
      return NextResponse.json(
        { errors: validation.error.issues },
        { status: 400 }
      );
    }

    const where: any = {};
    if (author) where.author = author;
    if (title) where.title = title;

    // Ez visszaad egy bakelit listát, nem csak a darabszámot
    const vinyls = await prisma.myVinyls.findMany({ where });

    return NextResponse.json(vinyls, { status: 200 });
  } catch (error) {
    console.error('GET API hiba:', error);
    return NextResponse.json(
      { error: 'Szerverhiba történt' },
      { status: 500 }
    );
  }
}

