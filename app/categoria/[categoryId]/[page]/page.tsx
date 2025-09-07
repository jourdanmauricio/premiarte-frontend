import { ProductsGid } from '@/components/products/products-gid';
import { getCategories } from '@/lib/fetch/get-categories';
import { getProducts } from '@/lib/fetch/get-products';

export const dynamic = 'auto';
export const revalidate = 86400;

const PAGE_SIZE = 6;

export async function generateStaticParams() {
  try {
    const categories = await getCategories({ page: '1', pageSize: 100 });

    const params = [];

    // Agregar la ruta especial "productos"
    for (let page = 1; page <= 5; page++) {
      params.push({
        categoryId: 'productos',
        page: page.toString(),
      });
    }

    // Generar páginas para las categorías reales
    if (categories?.categories) {
      for (const category of categories.categories) {
        for (let page = 1; page <= 5; page++) {
          params.push({
            categoryId: category.slug,
            page: page.toString(),
          });
        }
      }
    }

    return params;
  } catch (error) {
    console.error('❌ Error in generateStaticParams:', error);
    // Fallback: al menos generar productos
    return [
      { categoryId: 'productos', page: '1' },
      { categoryId: 'productos', page: '2' },
      { categoryId: 'productos', page: '3' },
    ];
  }
}

type CategoryPageProps = {
  params: { categoryId: string; page: string };
};

const CategoryPage = async ({ params }: CategoryPageProps) => {
  const { page, categoryId } = await params;

  const options = {
    page: page || '1',
    pageSize: PAGE_SIZE,
    ...(categoryId && categoryId !== 'productos' && { categoryId }),
  };

  const categories = await getCategories({ page: '1', pageSize: 100 });
  const products = await getProducts(options);

  return (
    <div>
      <ProductsGid categories={categories.categories} products={products} categoryId={categoryId} />
    </div>
  );
};

export default CategoryPage;
