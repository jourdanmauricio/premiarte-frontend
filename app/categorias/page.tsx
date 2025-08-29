import { ProductsGid } from '@/components/products/products-gid';
import { getCategories } from '@/lib/fetch/get-categories';
import { getProducts } from '@/lib/fetch/get-products';

const PAGE_SIZE = 12;
const ProductsPage = async () => {
  const categories = await getCategories({});
  const products = await getProducts({ page: '1', pageSize: PAGE_SIZE });

  console.log('products', products);

  return (
    <div>
      <ProductsGid categories={categories} products={products} />
    </div>
  );
};

export default ProductsPage;
