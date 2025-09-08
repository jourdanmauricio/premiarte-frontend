'use client';

import { Category } from '@/lib/types/strapi';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

type FilterSidebarProps = {
  categories: Category[];
  isMobile: boolean;
};

const FilterSidebar = ({ categories, isMobile }: FilterSidebarProps) => {
  const pathname = usePathname();

  const handleCategoryClick = () => {
    // Marcar que es navegación entre categorías
    if (typeof document !== 'undefined') {
      document.documentElement.setAttribute('data-category-navigation', 'true');

      // Remover el atributo después de la transición
      setTimeout(() => {
        document.documentElement.removeAttribute('data-category-navigation');
      }, 200);
    }
  };

  return (
    <div className={`space-y-6 ${isMobile ? '' : 'sticky top-20'}`}>
      <div className='space-y-4'>
        <h3 className='text-lg font-medium'>Categorías</h3>
        <div className='space-y-2'>
          <Link
            href={`/categoria/productos/1`}
            onClick={handleCategoryClick}
            className={`group flex cursor-pointer items-center space-x-2 ${pathname.startsWith('/categoria/productos') ? 'font-bold text-primary' : 'font-normal text-muted-foreground'} transition-colors hover:text-primary`}
          >
            Todos los productos
          </Link>
          {categories.map((category) => (
            <Link
              href={`/categoria/${category.slug}/1`}
              onClick={handleCategoryClick}
              key={category.id}
              className={`group flex cursor-pointer items-center space-x-2 ${pathname.startsWith(`/categoria/${category.slug}`) ? 'font-bold text-primary' : 'font-normal text-muted-foreground'} transition-colors hover:text-primary`}
            >
              {category.name}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export { FilterSidebar };
