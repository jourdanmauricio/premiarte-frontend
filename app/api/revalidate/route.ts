// app/api/regenerate-site/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath, revalidateTag } from 'next/cache';

export async function POST(req: NextRequest) {
  try {
    // Validar API Key
    // const apiKey = req.headers.get('x-api-key');
    // const validApiKey = process.env.REGENERATE_API_KEY;
    const authHeader = req.headers.get('Authorization');
    const expectedToken = `Bearer ${process.env.REVALIDATION_SECRET}`;

    if (authHeader !== expectedToken) {
      console.error('❌ Intento de acceso no autorizado al webhook');
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Leer el body de la solicitud
    const body = await req.json();
    console.log('Body', body);

    if (body.model === 'category') {
      revalidatePath('/categoria');
      revalidatePath(`/categoria/${body.entry.slug}/1`);
    }

    if (body.model === 'product') {
      revalidatePath('/categoria/productos/1');
      revalidatePath(`/productos/${body.entry.slug}`);
      if (body.entry.featured) revalidatePath(`/`);
      body.entry.categories.map((cat: any) => revalidatePath(`/categoria/${cat.slug}/1`));
    }

    if (body.model === 'home') {
      revalidatePath('/');
    }

    if (body.model === 'global') {
      revalidatePath('/');
    }

    console.log('✅ Revalidación exitosa');

    return NextResponse.json({
      success: true,
      message: 'Sitio regenerado exitosamente',
      timestamp: new Date().toISOString(),
      revalidated: true,
    });
  } catch (error) {
    console.error('Error regenerating site:', error);
    return NextResponse.json({ error: 'Error interno del servidor' }, { status: 500 });
  }
}

// Opcional: Para evitar que se acceda con otros métodos
export async function GET() {
  return NextResponse.json({ error: 'Method not allowed' }, { status: 405 });
}
