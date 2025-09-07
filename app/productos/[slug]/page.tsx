import { ProductGrid } from '@/components/product/product-grid';
import { getProduct } from '@/lib/fetch/get-products';

type ProductPageProps = {
  params: { slug: string };
};

// Configurar como página estática
export const dynamic = 'force-static';
export const revalidate = 86400; // 24 horas

const ProductPage = async ({ params }: ProductPageProps) => {
  const { slug } = await params;

  const product = await getProduct({ slug: slug || '' });

  return <ProductGrid product={product} />;
};

export default ProductPage;
