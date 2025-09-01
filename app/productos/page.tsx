import { ProductsGid } from '@/components/products/products-gid';
import { getCategories } from '@/lib/fetch/get-categories';
import { getProducts } from '@/lib/fetch/get-products';

type ProductsPageProps = {
  searchParams: { [key: string]: string | undefined };
};

const PAGE_SIZE = 9;
const ProductsPage = async ({ searchParams }: ProductsPageProps) => {
  const { page } = searchParams;

  const categories = await getCategories({ page: '1', pageSize: 1000 });
  const products = await getProducts({ page: page, pageSize: PAGE_SIZE });

  return (
    <div>
      <ProductsGid categories={categories.categories} products={products} />
    </div>
  );
};

export default ProductsPage;
