import { CategoriesGid } from '@/components/categories/categories-gid';
import { getCategories } from '@/lib/fetch/get-categories';

const PAGE_SIZE = 6;

type CategoryPageProps = {
  searchParams: { [key: string]: string | undefined };
};

const ProductsPage = async ({ searchParams }: CategoryPageProps) => {
  const { page } = searchParams;

  const categories = await getCategories({ page: page, pageSize: PAGE_SIZE });

  console.log('categories', categories);

  return (
    <div>
      <CategoriesGid categories={categories} />
    </div>
  );
};

export default ProductsPage;
