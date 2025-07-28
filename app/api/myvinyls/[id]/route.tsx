import { prisma } from '@/prisma/client';
import { NextRequest, NextResponse } from 'next/server';

export async function DELETE(
  request: NextRequest,
  context: { params: { id: string } }
) {
  const { id } = context.params;

  try {
    await prisma.wishedVinyls.delete({ where: { id: Number(id) } });
    return NextResponse.json({ message: 'Törlés sikeres' }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Hiba történt a törlés során' }, { status: 500 });
  }
}
