import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { getProducts } from '@/lib/fetch/get-products';
import { Heart, Search, ShoppingCart } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

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
        <div className='flex flex-wrap justify-center gap-6 pt-24'>
          {products.map((product) => (
            <div key={product.id} className='img-appear group relative w-64'>
              <div className='aspect-square overflow-hidden rounded-sm bg-background'>
                <Image
                  src={product.images[0].url}
                  alt={product.images[0].alt}
                  width={300}
                  height={300}
                  className='h-full w-full object-cover transition-transform group-hover:scale-105'
                />
                <div className='absolute right-4 top-4 flex flex-col gap-2'>
                  <Button
                    size='icon'
                    variant='secondary'
                    className='h-8 w-8 rounded-full opacity-0 transition-opacity group-hover:opacity-100'
                  >
                    <Heart className='h-4 w-4' />
                    <span className='sr-only'>Add to wishlist</span>
                  </Button>
                  <Button
                    size='icon'
                    variant='secondary'
                    className='h-8 w-8 rounded-full opacity-0 transition-opacity group-hover:opacity-100'
                  >
                    <Search className='h-4 w-4' />
                    <span className='sr-only'>Quick view</span>
                  </Button>
                </div>
                <div className='absolute inset-0 flex items-center justify-center opacity-0 transition-opacity group-hover:opacity-100'>
                  <Button className='mx-auto'>
                    <ShoppingCart className='mr-2 h-4 w-4' />
                    Add to Cart
                  </Button>
                </div>
              </div>
              <div className='mt-4 space-y-1 text-center'>
                <Badge variant='outline' className='mb-2'>
                  {product.categories[0].name}
                </Badge>
                <h3 className='font-medium'>{product.name}</h3>
                {/* <div className='flex justify-center gap-2'>
                  <span className='text-muted-foreground line-through'>
                    ${product.price.toFixed(2)}
                  </span>
                  <span className='font-medium text-primary'>${product.offerPrice.toFixed(2)}</span>
                </div> */}
              </div>
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
