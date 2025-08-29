import { StrapiResponse } from '@/lib/types/strapi';

type QueryOptions = {
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
  body?: any;
};

// Tipo para errores de Strapi
interface StrapiError {
  status: number;
  name: string;
  message: string;
  details?: {
    errors: Array<{
      path: string[];
      message: string;
      name: string;
      value: any;
    }>;
  };
}

interface StrapiErrorResponse {
  data: null;
  error: StrapiError;
}

class ValidationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'ValidationError';
  }
}

export function query<T>(url: string, options: QueryOptions = {}): Promise<StrapiResponse<T>> {
  const { method = 'GET', body } = options;

  const fetchOptions: RequestInit = {
    method,
    headers: {
      'Content-Type': 'application/json',
    },
  };

  if (body && method !== 'GET') {
    fetchOptions.body = JSON.stringify(body);
  }

  return fetch(`/api/strapi/${url}`, fetchOptions).then(async (res) => {
    if (!res.ok) {
      const errorText = await res.text();

      try {
        const errorData: StrapiErrorResponse = JSON.parse(errorText);

        // Manejar errores de validación específicos
        if (errorData.error?.name === 'ValidationError') {
          // Usar solo el mensaje principal del error
          const errorMessage = errorData.error.message;
          throw new ValidationError(errorMessage);
        }

        // Otros errores de Strapi
        throw new Error(`Error de Strapi: ${errorData.error?.message || 'Error desconocido'}`);
      } catch (parseError) {
        // Si es nuestro ValidationError, re-lanzarlo
        if (parseError instanceof ValidationError) {
          throw parseError;
        }

        // Si no se puede parsear como JSON, usar el error original
        throw new Error(`HTTP error! status: ${res.status}, body: ${errorText}`);
      }
    }

    return res.json() as Promise<StrapiResponse<T>>;
  });
}
