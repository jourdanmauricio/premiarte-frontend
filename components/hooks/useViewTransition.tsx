// hooks/useViewTransition.ts
'use client';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

interface TransitionNames {
  image?: string;
  title?: string;
}

type CategorySlug = string | null;

export const useViewTransition = (productId: string | number): TransitionNames => {
  const pathname = usePathname();
  const [sourceCategory, setSourceCategory] = useState<CategorySlug>(null);

  // Obtener categoría actual desde la URL
  const getCurrentCategory = (): CategorySlug => {
    if (pathname.includes('/categoria/productos')) return 'productos';

    const segments = pathname.split('/');
    if (segments[1] === 'categoria' && segments[2]) {
      return segments[2]; // banderas, cristales, etc.
    }
    return null;
  };

  // Para páginas de detalle, detectar desde dónde vinimos
  useEffect(() => {
    if (pathname.startsWith('/productos/') && typeof window !== 'undefined') {
      const referrer = document.referrer;

      if (referrer.includes('/categoria/productos')) {
        setSourceCategory('productos');
      } else if (referrer.includes('/categoria/')) {
        // Extraer categoría del referrer
        const referrerSegments = referrer.split('/');
        const categoryIndex = referrerSegments.findIndex((segment) => segment === 'categoria');

        if (categoryIndex !== -1 && referrerSegments[categoryIndex + 1]) {
          const categorySlug = referrerSegments[categoryIndex + 1];
          // Limpiar posibles query params o fragmentos
          setSourceCategory(categorySlug.split('?')[0].split('#')[0]);
        }
      }
    }
  }, [pathname]);

  const getTransitionNames = (): TransitionNames => {
    // Si estamos en una página de listado (categorías)
    if (pathname.includes('/categoria/')) {
      const currentCategory = getCurrentCategory();

      if (currentCategory) {
        return {
          image: `product-image-${currentCategory}-${productId}`,
          title: `product-title-${currentCategory}-${productId}`,
        };
      }

      return { image: undefined, title: undefined };
    }

    // Si estamos en una página de detalle y conocemos la fuente
    if (pathname.startsWith('/productos/') && sourceCategory) {
      return {
        image: `product-image-${sourceCategory}-${productId}`,
        title: `product-title-${sourceCategory}-${productId}`,
      };
    }

    // Por defecto, no aplicar view transitions
    return { image: undefined, title: undefined };
  };

  return getTransitionNames();
};
