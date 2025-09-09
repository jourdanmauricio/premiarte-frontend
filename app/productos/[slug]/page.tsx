import { ProductGrid } from '@/components/product/product-grid';
import { getProduct, getProducts } from '@/lib/fetch/get-products';

type ProductPageProps = {
  params: { slug: string };
};

// Configurar como página estática
export const dynamic = 'force-static';
export const revalidate = 86400; // 24 horas

const ProductPage = async ({ params }: ProductPageProps) => {
  const { slug } = await params;

  const product = await getProduct({ slug: slug || '' });

  const allRelatedProducts = await getProducts({
    categoryId: product.categories[0].slug,
    page: '1',
    pageSize: 4,
  });

  const relatedProducts = allRelatedProducts.products.filter((prod) => prod.id !== product.id);

  return <ProductGrid product={product} relatedProducts={relatedProducts} />;
};

export default ProductPage;
