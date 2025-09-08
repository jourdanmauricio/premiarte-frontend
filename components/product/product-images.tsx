import { useViewTransition } from '@/components/hooks/useViewTransition';
import { Product } from '@/lib/types/strapi';
import Image from 'next/image';
import { useState } from 'react';

type ProductImagesProps = {
  product: Product;
};

const ProductImages = ({ product }: ProductImagesProps) => {
  const [currentImage, setCurrentImage] = useState(0);

  const transitionNames = useViewTransition(product.id);
  return (
    <div className='mx-auto max-w-[400px]'>
      {product.images && product.images.length > 0 ? (
        <div className='min-w-[350px]'>
          <Image
            src={product.images[currentImage].url}
            alt={product.images[currentImage].alt || product.name}
            className='w-full rounded-lg object-cover'
            width={400}
            height={400}
            priority
            style={{ viewTransitionName: transitionNames.image }}
          />
        </div>
      ) : (
        <div className='flex h-64 w-full items-center justify-center rounded-lg bg-gray-200 text-gray-500'>
          No Image Available
        </div>
      )}
      <div className='mt-4 flex flex-wrap justify-start gap-4'>
        {product.images.map((img, index) => (
          <Image
            key={index}
            src={img.url}
            alt={img.alt || `Thumbnail ${index + 1}`}
            className='h-16 w-16 cursor-pointer rounded-lg object-cover'
            width={80}
            height={80}
            onClick={() => setCurrentImage(index)}
          />
        ))}
      </div>
    </div>
  );
};

export { ProductImages };
