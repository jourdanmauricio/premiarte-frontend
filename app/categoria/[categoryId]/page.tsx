import { ProductsGid } from '@/components/products/products-gid';
import { getCategories } from '@/lib/fetch/get-categories';
import { getProducts } from '@/lib/fetch/get-products';

// Configurar como página estática
// export const dynamic = 'force-static';
// export const revalidate = 86400; // 24 horas

const PAGE_SIZE = 6;

type CategoryPageProps = {
  params: { categoryId: string };
  searchParams: { [key: string]: string | undefined };
};
const CategoryPage = async ({ params, searchParams }: CategoryPageProps) => {
  const { page } = await searchParams;
  const { categoryId } = await params;

  const options = {
    page: page || '1',
    pageSize: PAGE_SIZE,
    ...(categoryId && categoryId !== 'productos' && { categoryId }),
  };

  const categories = await getCategories({ page: '1', pageSize: 100 });
  const products = await getProducts(options);

  return (
    <div>
      <ProductsGid categories={categories.categories} products={products} />
    </div>
  );
};

export default CategoryPage;
