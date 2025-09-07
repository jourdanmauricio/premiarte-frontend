'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Filter } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';
import { CustomPagination } from '@/components/ui/custom/custom-pagination';
import { Category, Products } from '@/lib/types/strapi';
import { FilterSidebar } from '@/components/products/filter-sidebar';
import { ProductCard } from '@/components/ui/custom/product-card';
import { CategoryPagination } from '@/components/ui/custom/category-pagination';

type ProductsGridProps = {
  categories: Category[];
  products: Products;
  categoryId?: string; // Agregar categoryId
};

const ProductsGid = ({ categories, products, categoryId }: ProductsGridProps) => {
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  return (
    <div className='container px-4 py-8 md:px-6 md:py-12'>
      <div className='mb-8'>
        <h1 className='mb-2 font-montserrat text-3xl font-semibold'>Productos</h1>
      </div>

      <div className='flex flex-col gap-8 md:flex-row'>
        {/* Filters - Desktop */}
        <div className='hidden w-64 shrink-0 md:block'>
          <FilterSidebar categories={categories} isMobile={false} />
        </div>

        {/* Filters - Mobile */}
        <Sheet open={mobileFiltersOpen} onOpenChange={setMobileFiltersOpen}>
          <SheetContent side='left' className='w-full sm:max-w-md'>
            <SheetHeader className='mb-4'>
              <SheetTitle>Filters</SheetTitle>
              <SheetDescription>Narrow down your product search</SheetDescription>
            </SheetHeader>
            <FilterSidebar isMobile={true} categories={categories} />
          </SheetContent>
        </Sheet>

        {/* Product Grid */}
        <div className='flex-1'>
          <div className='mb-6 flex flex-wrap items-center justify-between gap-4'>
            <div className='flex items-center gap-2'>
              <Button
                variant='outline'
                size='sm'
                className='flex items-center gap-2 md:hidden'
                onClick={() => setMobileFiltersOpen(true)}
              >
                <Filter className='h-4 w-4' />
                Filters
              </Button>
            </div>
          </div>

          {products.products.length === 0 ? (
            <div className='py-12 text-center'>
              <h3 className='mb-2 text-lg font-medium'>No products found</h3>
              <p className='mb-4 text-muted-foreground'>
                Try adjusting your filters to find what you're looking for.
              </p>

              <Button asChild>
                <Link href='/categoria/productos/1'>Ver todos los productos</Link>
              </Button>
            </div>
          ) : (
            <div className='flex flex-wrap justify-center gap-12'>
              {products.products.map((product) => (
                <div key={product.id} className='group relative w-64'>
                  <ProductCard product={product} />
                </div>
              ))}
            </div>
          )}

          {/* Usar CategoryPagination si hay categoryId, sino CustomPagination */}
          {categoryId ? (
            <CategoryPagination
              pageCount={products.pagination?.pageCount || 1}
              categoryId={categoryId}
            />
          ) : (
            <CustomPagination pageCount={products.pagination?.pageCount || 1} />
          )}
        </div>
      </div>
    </div>
  );
};

export { ProductsGid };
