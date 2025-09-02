// app/api/regenerate-site/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { revalidateTag } from 'next/cache';

export async function POST(req: NextRequest) {
  try {
    // Validar API Key
    const apiKey = req.headers.get('x-api-key');
    const validApiKey = process.env.REGENERATE_API_KEY;

    if (!apiKey || apiKey !== validApiKey) {
      return NextResponse.json({ error: 'Unauthorized: Invalid API Key' }, { status: 401 });
    }

    console.log('🔧 Regenerando sitio...');
    console.log('🏷️ Revalidando tag: premiarte-tag');

    // Revalidar el tag específico
    revalidateTag('premiarte-tag');

    // También puedes revalidar paths específicos si necesitas
    // await revalidatePath('/');
    // await revalidatePath('/productos');

    console.log('✅ Tag revalidado exitosamente');

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
