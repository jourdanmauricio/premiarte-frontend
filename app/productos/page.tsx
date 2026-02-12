import { ProductsPage } from "@/app/components/productsPage/ProductsPage";

const Page = async ({
  searchParams,
}: {
  searchParams?: Promise<{ category?: string; page?: string }>;
}) => {
  const params = await searchParams;
  const currentCategory = params?.category || "";
  const currentPage = Number(params?.page) || 1;

  console.log("currentCategory", currentCategory);
  console.log("currentPage", currentPage);

  return <ProductsPage category={currentCategory} currentPage={currentPage} />;
};

export default Page;
