'use client';

import Link from 'next/link';
import Image from 'next/image';
import { SearchIcon } from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Product } from '@/lib/types/strapi';
import { useViewTransition } from '@/components/hooks/useViewTransition';
import { usePathname } from 'next/navigation';

type ProductCardProps = {
  product: Product;
};

const ProductCard = ({ product }: ProductCardProps) => {
  const pathname = usePathname();
  const transitionNames = useViewTransition(product);

  // Función para guardar la categoría actual antes de navegar
  const handleProductClick = () => {
    if (typeof window !== 'undefined') {
      if (pathname.includes('/categoria/productos')) {
        sessionStorage.setItem('lastCategory', 'productos');
      } else if (pathname.includes('/categoria/')) {
        const segments = pathname.split('/');
        const categoryIndex = segments.findIndex((segment) => segment === 'categoria');
        if (categoryIndex !== -1 && segments[categoryIndex + 1]) {
          const categorySlug = segments[categoryIndex + 1];
          sessionStorage.setItem('lastCategory', categorySlug);
        }
      }
    }
  };

  return (
    <>
      <Link href={`/productos/${product.slug}`} onClick={handleProductClick}>
        <div className='aspect-square overflow-hidden rounded-sm bg-background hover:cursor-pointer'>
          <Image
            src={product.images[0].url || '/placeholder.svg'}
            alt={product.images[0].alt}
            width={300}
            height={300}
            className='h-full w-full object-cover transition-transform duration-500 group-hover:scale-105'
            style={{
              viewTransitionName: transitionNames.image,
            }}
          />

          <div className='absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-500 group-hover:opacity-100'>
            <Button className='mx-auto'>
              <SearchIcon className='mr-2 h-4 w-4' />
              Ver detalle
              {product.id}
            </Button>
          </div>
        </div>
        <div className='mt-4 space-y-1 text-center'>
          <Badge variant='outline' className='mb-2'>
            {product.categories[0].name}
          </Badge>
          <h3 className='font-medium' style={{ viewTransitionName: transitionNames.title }}>
            {product.name}
          </h3>
          <div className='flex justify-center gap-2'></div>
        </div>
      </Link>
    </>
  );
};

export { ProductCard };
