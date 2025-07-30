import { prisma } from '@/prisma/client';
import { NextRequest, NextResponse } from 'next/server';
import { NextApiRequest } from 'next';

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const id = (await params).id;

  try {
    await prisma.wishedVinyls.delete({ where: { id: Number(id) } });
    return NextResponse.json({ message: 'Törlés sikeres' }, { status: 200 });
  } catch (error) {
    console.error('Törlés hiba:', error);
    return NextResponse.json(
      { error: 'Hiba történt a törlés során' },
      { status: 500 }
    );
  }
}
