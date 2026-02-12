import { ProductsPage } from "@/components/productsPage/ProductsPage";

const Page = async ({
  searchParams,
}: {
  searchParams?: Promise<{ category?: string; page?: string }>;
}) => {
  const params = await searchParams;
  const currentCategory = params?.category || "";
  const currentPage = Number(params?.page) || 1;

  return <ProductsPage category={currentCategory} currentPage={currentPage} />;
};

export default Page;
