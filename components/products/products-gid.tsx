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

type Category = {
  id: number;
  name: string;
  slug: string;
  description?: string;
  image: string;
  featured: boolean;
};

type Product = {
  id: number;
  documentId: string;
  name: string;
  slug: string;
  isActive: boolean;
  // description: RootNode[];
  description: any;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  featured: boolean;
  sku: string;
  images: {
    url: string;
    alt: string;
  }[];
  categories: Category[];
};

type Products = {
  pagination:
    | {
        page: number;
        pageSize: number;
        pageCount: number;
        total: number;
      }
    | undefined;
  products: Product[];
};

type ProductsGridProps = {
  categories: Category[];
  products: Products;
  slug?: string;
};

const ProductsGid = ({ categories, products, slug }: ProductsGridProps) => {
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [page, setPage] = useState(1);
  const [categoryFilter, setCategoryFilter] = useState<string | null>(slug || null);

  // capturar url /products o /categorias

  const router = useRouter();
  const pathname = usePathname();

  console.log('pathname', pathname);
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
    console.log('GET ', `${path}?${params.toString()}`);
    router.push(`${path}?${params.toString()}`);
  };

  const clearFilters = () => {
    router.push(`/categorias`);
  };

  const FilterSidebar = ({ isMobile = false }) => (
    <div className={`space-y-6 ${isMobile ? '' : 'sticky top-20'}`}>
      <div className='space-y-4'>
        <h3 className='text-lg font-medium text-primary'>Categorías</h3>
        <div className='space-y-2'>
          {categories.map((category) => (
            <div key={category.id} className='flex items-center space-x-2'>
              <Checkbox
                id={`category-${category.id}`}
                checked={slug === category.slug}
                onCheckedChange={() => toggleFilter(category)}
              />
              <Label
                htmlFor={`category-${category.id}`}
                className='cursor-pointer text-sm font-normal'
              >
                {category.name}
              </Label>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className='container px-4 py-8 md:px-6 md:py-12'>
      <div className='mb-8'>
        <h1 className='mb-2 text-3xl font-bold'>Productos</h1>
      </div>

      <div className='flex flex-col gap-8 md:flex-row'>
        {/* Filters - Desktop */}
        <div className='hidden w-64 shrink-0 md:block'>
          <FilterSidebar />
        </div>

        {/* Filters - Mobile */}
        <Sheet open={mobileFiltersOpen} onOpenChange={setMobileFiltersOpen}>
          <SheetContent side='left' className='w-full sm:max-w-md'>
            <SheetHeader className='mb-4'>
              <SheetTitle>Filters</SheetTitle>
              <SheetDescription>Narrow down your product search</SheetDescription>
            </SheetHeader>
            <FilterSidebar isMobile={true} />
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
            // <div className='grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3'>
            <div className='flex flex-wrap justify-center gap-12'>
              {products.products.map((product) => (
                <div key={product.id} className='group relative w-64'>
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
                    <Badge variant='outline' className='mb-2'>
                      {product.categories[0].name}
                    </Badge>
                    <h3 className='font-medium'>{product.name}</h3>
                    <div className='flex justify-center gap-2'></div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Pagination */}

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
