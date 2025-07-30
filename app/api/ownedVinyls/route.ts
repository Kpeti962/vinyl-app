import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/prisma/client';

export async function GET(request: NextRequest) {
  try {
   
    const acquisitions = await prisma.acquisition.findMany({
      include: {
        vinyl: true, 
      },
    });

   
    const result = acquisitions.map((acq) => ({
      id: acq.id,
      author: acq.vinyl.author,
      title: acq.vinyl.title,
      acquiredAt: acq.acquiredAt,
    }));

    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    console.error('GET /api/ownedVinyls hiba:', error);
    return NextResponse.json({ error: 'Szerverhiba történt' }, { status: 500 });
  }
}
