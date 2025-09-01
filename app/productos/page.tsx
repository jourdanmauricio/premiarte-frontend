import { ProductsGid } from '@/components/products/products-gid';
import { getCategories } from '@/lib/fetch/get-categories';
import { getProducts } from '@/lib/fetch/get-products';

const PAGE_SIZE = 9;
const ProductsPage = async () => {
  const categories = await getCategories({ page: '1', pageSize: 100 });
  const products = await getProducts({ page: '1', pageSize: PAGE_SIZE });

  return (
    <div>
      <ProductsGid categories={categories.categories} products={products} />
    </div>
  );
};

export default ProductsPage;
