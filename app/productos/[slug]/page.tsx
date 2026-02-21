import { ProductPage } from "@/components/productPage/ProductPage";

const Page = async ({
  params,
}: {
  params: Promise<{ slug: string }>;
}) => {
  const { slug } = await params;
  return <ProductPage slug={slug} />;
};

export default Page;
