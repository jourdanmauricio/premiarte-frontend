'use client';

import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Category } from '@/lib/types/strapi';
import Link from 'next/link';
import { usePathname, useSearchParams, useRouter } from 'next/navigation';

type FilterSidebarProps = {
  categories: Category[];
  currentCategory: string | null;
  isMobile: boolean;
};

const FilterSidebar = ({ categories, currentCategory, isMobile }: FilterSidebarProps) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();

  // Función para manejar el cambio de categoría
  const handleCategoryChange = (categorySlug: string) => {
    const params = new URLSearchParams(searchParams.toString());

    if (currentCategory === categorySlug) {
      params.delete('category');
    } else {
      params.set('category', categorySlug);
    }

    params.set('page', '1');

    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  };

  // Determinar si una categoría está activa
  const isCategoryActive = (categorySlug: string) => {
    return currentCategory === categorySlug;
  };

  return (
    <div className={`space-y-6 ${isMobile ? '' : 'sticky top-20'}`}>
      <div className='space-y-4'>
        <h3 className='text-lg font-medium text-primary'>Categorías</h3>
        <div className='space-y-2'>
          {categories.map((category) => (
            <div
              key={category.id}
              className='group flex cursor-pointer items-center space-x-2'
              onClick={() => handleCategoryChange(category.slug)}
            >
              <Checkbox
                id={`category-${category.id}`}
                checked={isCategoryActive(category.slug)}
                className='transition-opacity group-hover:opacity-80'
                onCheckedChange={() => handleCategoryChange(category.slug)}
              />
              <Label
                htmlFor={`category-${category.id}`}
                className='cursor-pointer text-sm font-normal transition-colors group-hover:text-primary'
              >
                {category.name}
              </Label>
            </div>
          ))}
        </div>
      </div>

      {/* Opción para limpiar todos los filtros */}
      {currentCategory && (
        <button
          onClick={() => {
            const params = new URLSearchParams(searchParams.toString());
            params.delete('category');
            router.replace(`${pathname}?${params.toString()}`, { scroll: false });
          }}
          className='block text-sm text-muted-foreground transition-colors hover:text-primary'
        >
          Limpiar filtros
        </button>
      )}
    </div>
  );
};

export { FilterSidebar };
