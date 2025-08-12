// app/api/acquisition/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/prisma/client'; // vagy ahova importálod a prisma példányt

// POST metódus: megszerzés létrehozása
export async function POST(request: NextRequest) {
  try {
    const { vinylId } = await request.json();
    console.log("Kapott vinylId:", vinylId);

    if (typeof vinylId !== 'number') {
      return NextResponse.json(
        { error: 'A vinylId szám típusúnak kell lennie.' },
        { status: 400 }
      );
    }

    // Ellenőrizzük, hogy már megszerezve van-e
    const exists = await prisma.acquisition.findUnique({
      where: { id: vinylId },
    });

    if (exists) {
      return NextResponse.json(
        { error: 'Ez a bakelit már megszerzettként szerepel.' },
        { status: 409 }
      );
    }

    const newAcquisition = await prisma.acquisition.create({
      data: { id: vinylId },
    });

    return NextResponse.json(newAcquisition, { status: 201 });
  } catch (error) {
    console.error('POST /api/acquisition hiba:', error);
    return NextResponse.json(
      { error: 'Szerverhiba történt a megszerzés létrehozásakor.' },
      { status: 500 }
    );
  }
}

// DELETE metódus: megszerzés visszavonása (törlése)
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const vinylIdStr = searchParams.get('vinylId');
    if (!vinylIdStr) {
      return NextResponse.json(
        { error: 'Hiányzik a vinylId paraméter.' },
        { status: 400 }
      );
    }

    const vinylId = Number(vinylIdStr);
    if (isNaN(vinylId)) {
      return NextResponse.json(
        { error: 'A vinylId paraméternek számnak kell lennie.' },
        { status: 400 }
      );
    }

    // Megszerezési rekord törlése a vinylId alapján
    await prisma.acquisition.delete({
      where: { id: vinylId },
    });

    return NextResponse.json(
      { message: 'Megszerezve státusz sikeresen visszavonva.' },
      { status: 200 }
    );
  } catch (error) {
    console.error('DELETE /api/acquisition hiba:', error);
    return NextResponse.json(
      { error: 'Nem található megszerzés ezzel a vinylId-vel.' },
      { status: 404 }
    );
  }
}
