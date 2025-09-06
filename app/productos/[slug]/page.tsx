import { getProduct } from '@/lib/fetch/get-products';

type ProductPageProps = {
  // searchParams: Promise<{ [key: string]: string | undefined }>;
  params: { slug: string };
};

const PAGE_SIZE = 9;
const ProductPage = async ({ params }: ProductPageProps) => {
  const { slug } = params;

  console.log('slug', slug);

  const product = await getProduct({ slug: slug || '' });

  return (
    <div>
      {/* <ProductsGid categories={categories.categories} products={products} /> */}
      {JSON.stringify(product)}
    </div>
  );
};

export default ProductPage;
