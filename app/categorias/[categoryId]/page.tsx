import { ProductsGid } from '@/components/products/products-gid';
import { getCategories } from '@/lib/fetch/get-categories';
import { getProducts } from '@/lib/fetch/get-products';

const PAGE_SIZE = 6;

type CategoryPageProps = {
  params: { categoryId: string };
  searchParams: { [key: string]: string | undefined };
};
const CategoryPage = async ({ params, searchParams }: CategoryPageProps) => {
  const { categoryId } = params;
  const { page } = searchParams;

  const categories = await getCategories({ page: '1', pageSize: 100 });
  const products = await getProducts({ page, categoryId, pageSize: PAGE_SIZE });

  console.log('products', products);

  return (
    <div>
      <ProductsGid categories={categories.categories} products={products} slug={categoryId} />
    </div>
  );
};

export default CategoryPage;
