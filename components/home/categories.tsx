import { getCategories } from '@/lib/fetch/get-categories';
import Image from 'next/image';
import Link from 'next/link';

type CategoriesProps = {
  categoriesTitle?: string;
};

const Categories = async ({ categoriesTitle }: CategoriesProps) => {
  const categories = await getCategories({ featured: true });
  return (
    <section className='bg-muted py-12 md:py-16'>
      <div className='container px-4 md:px-6'>
        <h2 className='mb-8 text-center text-2xl font-bold tracking-tight md:text-3xl'>
          {categoriesTitle || 'Explore nuestras categorías'}
        </h2>
        <div className='grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6'>
          {categories.map((category) => {
            return (
              <Link
                key={category.id}
                href={`/categoria/${category.slug}`}
                className='group relative overflow-hidden rounded-lg bg-background shadow-md transition-all hover:shadow-lg'
              >
                <div className='relative aspect-square'>
                  <Image
                    src={category.image || '/placeholder.svg'}
                    alt={category.name}
                    fill
                    className='object-cover transition-transform group-hover:scale-105'
                  />
                  <div className='absolute inset-0 bg-gradient-to-t from-black/60 to-transparent' />
                  <div className='absolute bottom-0 w-full p-4'>
                    <h3 className='text-lg font-semibold text-white'>{category.name}</h3>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export { Categories };
