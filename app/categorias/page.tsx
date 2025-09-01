import { CategoriesGid } from '@/components/categories/categories-gid';
import { getCategories } from '@/lib/fetch/get-categories';

const PAGE_SIZE = 6;

type CategoryPageProps = {
  searchParams: Promise<{ [key: string]: string | undefined }>;
};

const ProductsPage = async ({ searchParams }: CategoryPageProps) => {
  const params = await searchParams;
  const { page } = params;

  const categories = await getCategories({ page: page, pageSize: PAGE_SIZE });

  return (
    <div>
      <CategoriesGid categories={categories} />
    </div>
  );
};

export default ProductsPage;
