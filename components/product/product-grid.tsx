import { StrapiProducts } from '@/lib/types/strapi';
import { BlocksRenderer } from '@strapi/blocks-react-renderer';
import Image from 'next/image';

import { Product } from '@/lib/types/strapi';

type ProductGridProps = {
  product: Product;
};

const ProductGrid = ({ product }: ProductGridProps) => {
  return (
    <div className='container px-4 py-8 md:px-6 md:py-12'>
      <div className='mb-8'>
        <h1 className='mb-2 font-montserrat text-3xl font-semibold'>Productos</h1>
      </div>
      <div className='flex gap-12 px-40'>
        <div className='w-1/2'>
          {product.images && product.images.length > 0 ? (
            <Image
              src={product.images[0].url}
              alt={product.images[0].alt || product.name}
              className='w-full rounded-lg object-cover'
              width={400}
              height={400}
              priority
              // style={{ viewTransitionName: `product-image-${product.id}` }}
            />
          ) : (
            <div className='flex h-64 w-full items-center justify-center rounded-lg bg-gray-200 text-gray-500'>
              No Image Available
            </div>
          )}
        </div>
        <div className='w-1/2'>
          <div className='mt-6 md:mt-0 md:w-1/2'></div>
          <h2 className='text-2xl font-semibold'>{product.name}</h2>
          <BlocksRenderer content={product.description} />

          <p className='mt-4 text-lg text-gray-700'>Código: {product.sku}</p>
          <p className='mt-4 text-lg text-gray-700'>
            {/* Categorías: {product.categories.map((cat) => cat.name).join(', ')} */}
          </p>
        </div>
      </div>
    </div>
  );
};

export { ProductGrid };
