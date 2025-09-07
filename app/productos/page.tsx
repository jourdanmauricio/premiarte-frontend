import { ProductsGid } from '@/components/products/products-gid';
import { getCategories } from '@/lib/fetch/get-categories';
import { getProducts } from '@/lib/fetch/get-products';

type ProductsPageProps = {
  searchParams: Promise<{ [key: string]: string | undefined }>;
};

const PAGE_SIZE = 9;

// Configurar como página estática
export const dynamic = 'force-static';
export const revalidate = 86400; // 24 horas

const ProductsPage = async ({ searchParams }: ProductsPageProps) => {
  const params = await searchParams;
  const { page } = params;

  const categories = await getCategories({ page: '1', pageSize: 1000 });
  const products = await getProducts({ page: page, pageSize: PAGE_SIZE });

  console.log('page', page);
  console.log('products', products);

  return (
    <div>
      <ProductsGid categories={categories.categories} products={products} />
    </div>
  );
};

export default ProductsPage;
