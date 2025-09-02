'use client';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import { useSearchParams } from 'next/navigation';

type PaginationProps = {
  pageCount: number;
};

const CustomPagination = ({ pageCount }: PaginationProps) => {
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get('page')) || 1;

  const isFirstPage = currentPage === 1;
  const isLastPage = currentPage === pageCount;

  const createPageUrl = (page: string | number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('page', page.toString());
    return `?${params.toString()}`;
  };

  // Generar números de página a mostrar
  const getVisiblePages = () => {
    const delta = 1; // Número de páginas a mostrar antes y después de la actual
    const range = [];
    const rangeWithDots = [];

    for (
      let i = Math.max(2, currentPage - delta);
      i <= Math.min(pageCount - 1, currentPage + delta);
      i++
    ) {
      range.push(i);
    }

    if (currentPage - delta > 2) {
      rangeWithDots.push(1, '...');
    } else {
      rangeWithDots.push(1);
    }

    rangeWithDots.push(...range);

    if (currentPage + delta < pageCount - 1) {
      rangeWithDots.push('...', pageCount);
    } else if (pageCount > 1) {
      rangeWithDots.push(pageCount);
    }

    return rangeWithDots;
  };

  const visiblePages = getVisiblePages();

  return (
    <Pagination className='mt-8'>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            href={createPageUrl(currentPage - 1)}
            className={isFirstPage ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
          />
        </PaginationItem>

        {visiblePages.map((pageNum, index) => (
          <PaginationItem key={index}>
            {pageNum === '...' ? (
              <PaginationEllipsis />
            ) : (
              <PaginationLink
                href={createPageUrl(pageNum as number)}
                isActive={currentPage === pageNum}
                className='cursor-pointer'
              >
                {pageNum}
              </PaginationLink>
            )}
          </PaginationItem>
        ))}

        <PaginationItem>
          <PaginationNext
            href={createPageUrl(currentPage + 1)}
            className={isLastPage ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};

export { CustomPagination };
