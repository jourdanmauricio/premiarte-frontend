import { getCategories } from '@/lib/fetch/get-categories';
import Image from 'next/image';
import Link from 'next/link';

type CategoriesProps = {
  categoriesTitle?: string;
};

const Categories = async ({ categoriesTitle }: CategoriesProps) => {
  const categories = await getCategories({ page: '1', pageSize: 100, featured: true });

  return (
    <section className='container px-4 py-20 md:px-6'>
      <div className='px-4 md:px-6'>
        <h2 className='text-center text-2xl font-semibold tracking-tight text-orange-500 md:text-3xl'>
          {categoriesTitle || 'Explore nuestras categorías'}
        </h2>
        <div className='mt-24 flex flex-wrap justify-center gap-8'>
          {categories.categories.map((category) => (
            <Link
              key={category.id}
              href={`/categoria/${category.slug}/1`}
              className='img-appear group relative w-64 overflow-hidden rounded-sm bg-background shadow-md transition-all hover:shadow-lg'
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
          ))}
        </div>
      </div>
    </section>
  );
};

export { Categories };
