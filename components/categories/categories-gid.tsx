'use client';

import Image from 'next/image';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

import { Card } from '@/components/ui/card';
import { CustomPagination } from '@/components/ui/custom/custom-pagination';

type Category = {
  id: number;
  name: string;
  slug: string;
  description?: string;
  image: string;
  featured: boolean;
  productsCount: number;
};

type Categories = {
  pagination: {
    page: number;
    pageSize: number;
    pageCount: number;
    total: number;
  };

  categories: Category[];
};

type CategoriesGridProps = {
  categories: Categories;
};

const CategoriesGid = ({ categories }: CategoriesGridProps) => {
  const [page, setPage] = useState(1);

  const router = useRouter();

  const handlePageChange = (newPage: number) => {
    setPage(newPage);

    const params = new URLSearchParams();
    params.set('page', newPage.toString());
    router.push(`/categoria?${params.toString()}`);
  };

  const handleViewProducts = (category: Category) => {
    router.push(`/categoria/${category.slug}`);
  };

  return (
    <div className='container px-4 py-8 md:px-6 md:py-12'>
      <div className='mb-8'>
        <h1 className='mb-2 text-3xl font-bold'>Categorías</h1>
      </div>

      <div className='flex flex-wrap justify-center gap-6 pt-24'>
        {categories.categories.map((category) => (
          <Card
            key={category.id}
            className='group relative w-96 overflow-hidden border hover:cursor-pointer hover:border-primary/20'
            onClick={() => handleViewProducts(category)}
          >
            <div className='relative aspect-square overflow-hidden rounded-t-sm bg-background'>
              <Image
                src={category.image || '/placeholder.svg'}
                alt={category.name}
                width={350}
                height={350}
                className='h-full w-full object-cover transition-transform group-hover:scale-105'
              />

              <div className='absolute inset-0 flex items-center justify-center bg-black/80 p-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100'>
                <p className='text-center text-sm text-white'>{category.description}</p>
              </div>
            </div>
            <div className='my-4 space-y-1 text-center'>
              <h3 className='font-medium transition-colors duration-300 group-hover:text-orange-500'>
                {category.name}
              </h3>
              <p className='text-sm text-muted-foreground'>{category.productsCount} productos</p>
            </div>
          </Card>
        ))}
      </div>

      {categories.pagination!.pageCount > 1 && (
        <CustomPagination pageCount={categories.pagination?.pageCount || 1} />
      )}
    </div>
  );
};

export { CategoriesGid };
