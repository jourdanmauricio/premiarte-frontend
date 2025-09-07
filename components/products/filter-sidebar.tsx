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

  return (
    <div className={`space-y-6 ${isMobile ? '' : 'sticky top-20'}`}>
      <div className='space-y-4'>
        <h3 className='text-lg font-medium'>Categorías</h3>
        <div className='space-y-2'>
          <Link
            href={`/categoria/productos/1`}
            className={`group flex cursor-pointer items-center space-x-2 ${pathname === `/categoria/productos/1` ? 'font-bold text-primary' : 'font-normal text-muted-foreground'} transition-colors hover:text-primary`}
          >
            Todos los productos
          </Link>
          {categories.map((category) => (
            <Link
              href={`/categoria/${category.slug}/1`}
              key={category.id}
              className={`group flex cursor-pointer items-center space-x-2 ${pathname === `/categoria/${category.slug}` ? 'font-bold text-primary' : 'font-normal text-muted-foreground'} transition-colors hover:text-primary`}
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
