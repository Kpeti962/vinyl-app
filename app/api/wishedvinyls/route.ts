import { NextRequest, NextResponse } from 'next/server';
import schema from './schema';
import { prisma } from '@/prisma/client';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    if (body.id !== undefined && typeof body.id !== 'number') {
    //ha string érkezne
      const parsedId = Number(body.id);
      if (!Number.isInteger(parsedId)) {
        return NextResponse.json(
          { error: 'Az id-nek egész számnak kell lennie.' },
          { status: 400 }
        );
      }
      body.id = parsedId;
    }

    const validation = schema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json(
        { errors: validation.error.issues },
        { status: 400 }
      );
    }

    const exists = await prisma.wishedVinyls.findFirst({
      where: {
        id: body.id,
        author: body.author,
        title: body.title,
      },
    });

    if (exists) {
      return NextResponse.json(
        { error: 'Ez a bakelit már szerepel az adatbázisban.' },
        { status: 409 }
      ); 
    }

    const wishedVinyls = await prisma.wishedVinyls.create({
      data: {
        id: body.id,
        author: body.author,
        title: body.title,
      },
    });

    return NextResponse.json(wishedVinyls, { status: 201 });
  } catch (error) {
    console.error('POST API hiba:', error);
    return NextResponse.json({ error: 'Szerverhiba történt' }, { status: 500 });
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = request.nextUrl;
    const id = searchParams.get('id') || undefined;
    const author = searchParams.get('author') || undefined;
    const title = searchParams.get('title') || undefined;

    
    const where: any = {};
    if (id) {
      const parsedId = Number(id);
      if (!isNaN(parsedId)) {
        where.id = parsedId;
      } else {
        return NextResponse.json(
          { error: 'Az id csak szám lehet' },
          { status: 400 }
        );
      }
    }
    if (author) where.author = author;
    if (title) where.title = title;

   
    const vinyls = await prisma.wishedVinyls.findMany({
      include: { acquisitions: true }, 
    });

    const result = vinyls.map((v) => ({
      ...v,
      acquired: v.acquisitions.length > 0, 
    }));

    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    console.error('GET API hiba:', error);
    return NextResponse.json({ error: 'Szerverhiba történt' }, { status: 500 });
  }
}
