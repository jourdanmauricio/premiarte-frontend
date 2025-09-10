// hooks/useViewTransition.ts
'use client';
import { Product } from '@/lib/types/strapi';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

interface TransitionNames {
  image?: string;
  title?: string;
}

type CategorySlug = string | null;

export const useViewTransition = (product: Product): TransitionNames => {
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
      const storedCategory = sessionStorage.getItem('lastCategory');
      if (storedCategory) {
        setSourceCategory(storedCategory);
      } else {
        setSourceCategory('productos');
      }
    }
  }, [pathname, product.id]);

  const getTransitionNames = (): TransitionNames => {
    // Si estamos en una página de detalle
    if (pathname.startsWith('/productos/')) {
      // Usar sourceCategory (que viene del sessionStorage)
      if (sourceCategory) {
        return {
          image: `product-image-${sourceCategory}-${product.id}`,
          title: `product-title-${sourceCategory}-${product.id}`,
        };
      }
      // Si no tenemos sourceCategory, usar productos como fallback
      return {
        image: `product-image-productos-${product.id}`,
        title: `product-title-productos-${product.id}`,
      };
    }

    // Si estamos en una página de listado (categorías)
    if (pathname.includes('/categoria/')) {
      const currentCategory = getCurrentCategory();
      if (currentCategory) {
        return {
          image: `product-image-${currentCategory}-${product.id}`,
          title: `product-title-${currentCategory}-${product.id}`,
        };
      }
      return { image: undefined, title: undefined };
    }

    return { image: undefined, title: undefined };
  };

  return getTransitionNames();
};
