import { NextRequest, NextResponse } from 'next/server';

const { STRAPI_HOST, STRAPI_TOKEN } = process.env;

export async function GET(request: NextRequest, { params }: { params: { path: string[] } }) {
  return handleStrapiRequest(request, params, 'GET');
}

export async function POST(request: NextRequest, { params }: { params: { path: string[] } }) {
  return handleStrapiRequest(request, params, 'POST');
}

export async function PUT(request: NextRequest, { params }: { params: { path: string[] } }) {
  return handleStrapiRequest(request, params, 'PUT');
}

export async function DELETE(request: NextRequest, { params }: { params: { path: string[] } }) {
  return handleStrapiRequest(request, params, 'DELETE');
}

async function handleStrapiRequest(
  request: NextRequest,
  params: { path: string[] },
  method: string
) {
  try {
    const path = params.path.join('/');
    const url = `${STRAPI_HOST}/api/${path}`;

    const headers: HeadersInit = {
      Authorization: `Bearer ${STRAPI_TOKEN}`,
      'Content-Type': 'application/json',
    };

    const fetchOptions: RequestInit = {
      method,
      headers,
    };

    // Agregar body para métodos que no sean GET
    if (method !== 'GET') {
      const body = await request.json();
      fetchOptions.body = JSON.stringify(body);
    }

    const response = await fetch(url, fetchOptions);
    const data = await response.json();

    // Devolver la misma respuesta que Strapi
    return NextResponse.json(data, { status: response.status });
  } catch (error: any) {
    console.log('Error in Strapi API route:', error);
    return NextResponse.json({ error: 'Error interno del servidor' }, { status: 500 });
  }
}
