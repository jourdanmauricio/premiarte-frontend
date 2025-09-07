import { StrapiResponse } from '@/lib/types/strapi';

const { STRAPI_HOST, STRAPI_TOKEN } = process.env;

export function queryServer<T>(
  url: string,
  options: { method?: string; body?: any } = {}
): Promise<StrapiResponse<T>> {
  const { method = 'GET', body } = options;

  const fetchOptions: RequestInit = {
    method,
    headers: {
      Authorization: `Bearer ${STRAPI_TOKEN}`,
      'Content-Type': 'application/json',
    },
    next: {
      revalidate: 86400, // Cache por 24 horas
    },
  };

  if (body && method !== 'GET') {
    fetchOptions.body = JSON.stringify(body);
  }

  return fetch(`${STRAPI_HOST}/api/${url}`, fetchOptions).then(async (res) => {
    if (!res.ok) {
      const errorText = await res.text();
      throw new Error(`HTTP error! status: ${res.status}, body: ${errorText}`);
    }
    return res.json() as Promise<StrapiResponse<T>>;
  });
}
