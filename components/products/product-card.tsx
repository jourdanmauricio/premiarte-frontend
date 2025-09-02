import { Button } from '@/components/ui/button';
import { Product } from '@/lib/types/strapi';
import { Badge, Heart, Search, ShoppingCart } from 'lucide-react';
import Image from 'next/image';

type ProductCardProps = {
  product: Product;
};

const ProductCard = ({ product }: ProductCardProps) => {
  return (
    <>
      <div className='aspect-square overflow-hidden rounded-sm bg-background'>
        <Image
          src={product.images[0].url || '/placeholder.svg'}
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
        {/* variant='outline' */}
        <Badge className='mb-2'>{product.categories[0].name}</Badge>
        <h3 className='font-medium'>{product.name}</h3>
        <div className='flex justify-center gap-2'></div>
      </div>
    </>
  );
};

export { ProductCard };
