import Link from 'next/link';

import { Button } from '@/components/ui/button';
import { ProductCard } from '@/components/ui/custom/product-card';
import { getProducts } from '@/lib/fetch/get-products';

type FeaturedProductsProps = {
  productsTitle?: string;
};

const PAGE_SIZE = 6;

const FeaturedProducts = async ({
  productsTitle = 'Productos destacados',
}: FeaturedProductsProps) => {
  const { products } = await getProducts({ featured: true, page: '1', pageSize: PAGE_SIZE });

  return (
    <section className='container border-b px-4 py-20 md:px-6'>
      <div className='px-4 md:px-6'>
        <h2 className='text-center text-2xl font-semibold tracking-tight text-orange-500 md:text-3xl'>
          {productsTitle}
        </h2>
        <div className='flex flex-wrap justify-center gap-8 pt-24'>
          {products.map((product) => (
            <div key={product.id} className='img-appear group relative w-64'>
              <ProductCard product={product} />
            </div>
          ))}
        </div>
        <div className='mt-20 text-center'>
          <Button variant='outline' size='lg' asChild>
            <Link href='/productos'>
              <span className='text-xl text-orange-500'>Ver todos los productos</span>
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export { FeaturedProducts };
