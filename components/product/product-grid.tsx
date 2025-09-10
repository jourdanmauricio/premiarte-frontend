'use client';

import Link from 'next/link';
import { BlocksRenderer } from '@strapi/blocks-react-renderer';

import { Product } from '@/lib/types/strapi';
import { ProductImages } from '@/components/product/product-images';
import { useViewTransition } from '@/components/hooks/useViewTransition';
import Image from 'next/image';

type ProductGridProps = {
  product: Product;
  relatedProducts: Product[];
};

const ProductGrid = ({ product, relatedProducts }: ProductGridProps) => {
  const transitionNames = useViewTransition(product);

  return (
    <section>
      <article className='container px-4 py-8 md:px-6 md:py-12'>
        <header className='mb-8'>
          <h1 className='mb-2 font-montserrat text-3xl font-semibold'>Productos</h1>
        </header>
        <main className='flex flex-col gap-12 px-4 md:flex-row md:px-4 lg:px-12'>
          <div className='mx-auto w-full md:w-1/2'>
            <ProductImages product={product} />
          </div>
          <div className='w-1/2'>
            <h2
              className='text-3xl font-semibold text-primary'
              style={{ viewTransitionName: transitionNames.title }}
            >
              {product.name}
            </h2>
            <div className='mt-8 text-gray-200'>
              <BlocksRenderer content={product.description} />
            </div>

            <p className='mt-4 text-lg text-gray-200'>Código: {product.sku}</p>
            <p className='mt-4 text-lg text-gray-200'>
              Categorías:{' '}
              {product.categories.map((cat) => (
                <Link
                  className='cursor-pointer text-muted-foreground underline transition-colors hover:text-primary'
                  key={cat.id}
                  href={`/categoria/${cat.slug}/1`}
                >
                  {cat.name}
                </Link>
              ))}
            </p>
          </div>
        </main>
      </article>
      {relatedProducts.length > 0 && (
        <article className='container px-4 py-8 md:px-6 md:py-12'>
          <header className='mb-8'>
            <h2 className='text-3xl font-semibold text-primary'>Productos relacionados</h2>
          </header>
          <main className='flex flex-wrap justify-start gap-12'>
            {relatedProducts.slice(0, 4).map((product) => (
              <div key={product.id} className='group relative w-32'>
                <Link href={`/productos/${product.slug}`}>
                  <div className='aspect-square overflow-hidden rounded-sm bg-background hover:cursor-pointer'>
                    <Image
                      src={product.images[0].url || '/placeholder.svg'}
                      alt={product.images[0].alt}
                      width={200}
                      height={200}
                      className='h-full w-full object-cover transition-transform duration-500 group-hover:scale-105'
                    />
                  </div>
                </Link>
              </div>
            ))}
          </main>
        </article>
      )}
    </section>
  );
};

export { ProductGrid };
