import { NextRequest, NextResponse } from 'next/server';
import schema from './schema';
import { prisma } from '@/prisma/client';

export async function POST(request: NextRequest) {
  const body = await request.json();

  const validation = schema.safeParse(body);

  if (!validation.success) return NextResponse.json(validation.error.issues);

  const exists = await prisma.myVinyls.findFirst({
    where: {
      author: body.author,
      title: body.title,
    },
  });

  if (exists) {
    return NextResponse.json(
      { error: 'Ez a bakelit már szerepel az adatbázisban.' },
      { status: 400 }
    );
  }

  const myvinyls = await prisma.myVinyls.create({
    data: {
      author: body.author,
      title: body.title,
    },
  });
  return NextResponse.json(myvinyls, { status: 201 });
}
