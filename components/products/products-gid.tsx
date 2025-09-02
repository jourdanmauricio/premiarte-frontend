'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ShoppingCart, Heart, Search, Filter } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';
import { usePathname, useRouter } from 'next/navigation';
import { CustomPagination } from '@/components/ui/custom/custom-pagination';
import { Category, Products } from '@/lib/types/strapi';
import { FilterSidebar } from '@/components/products/filter-sidebar';
import { ProductCard } from '@/components/products/product-card';

type ProductsGridProps = {
  categories: Category[];
  products: Products;
  slug?: string;
};

const ProductsGid = ({ categories, products, slug }: ProductsGridProps) => {
  const [categoryFilter, setCategoryFilter] = useState<string | null>(slug || null);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [page, setPage] = useState(1);

  const router = useRouter();
  const pathname = usePathname();

  const isCategoryPage = pathname.startsWith('/categorias');

  const toggleFilter = (value: Category) => {
    if (categoryFilter === value.slug) {
      setCategoryFilter(null);
      return router.push(`/productos`);
    }
    router.push(`/categorias/${value.slug}`);
  };

  const handlePageChange = (newPage: number) => {
    setPage(newPage);

    const params = new URLSearchParams();
    params.set('page', newPage.toString());
    // if (sort) params.set('sort', sort);

    const path = isCategoryPage ? `/categorias/${slug}` : 'productos';
    router.push(`${path}?${params.toString()}`);
  };

  const clearFilters = () => {
    router.push(`/categorias`);
  };

  return (
    <div className='container px-4 py-8 md:px-6 md:py-12'>
      <div className='mb-8'>
        <h1 className='mb-2 text-3xl font-bold'>Productos</h1>
      </div>

      <div className='flex flex-col gap-8 md:flex-row'>
        {/* Filters - Desktop */}
        <div className='hidden w-64 shrink-0 md:block'>
          <FilterSidebar
            categories={categories}
            // slug={categoryFilter || undefined}
            // toggleFilter={toggleFilter}
            currentCategory={categoryFilter}
            isMobile={false}
          />
        </div>

        {/* Filters - Mobile */}
        <Sheet open={mobileFiltersOpen} onOpenChange={setMobileFiltersOpen}>
          <SheetContent side='left' className='w-full sm:max-w-md'>
            <SheetHeader className='mb-4'>
              <SheetTitle>Filters</SheetTitle>
              <SheetDescription>Narrow down your product search</SheetDescription>
            </SheetHeader>
            <FilterSidebar
              isMobile={true}
              currentCategory={categoryFilter}
              categories={categories}
              // slug={categoryFilter || undefined}
              // toggleFilter={toggleFilter}
            />
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
              <Button onClick={clearFilters}>Clear all filters</Button>
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

          <CustomPagination
            page={page}
            pageCount={products.pagination?.pageCount || 1}
            onPageChange={handlePageChange}
          />
        </div>
      </div>
    </div>
  );
};

export { ProductsGid };
