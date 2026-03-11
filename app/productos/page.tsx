import { ProductsPage } from "@/components/productsPage/ProductsPage";

const Page = async ({
  searchParams,
}: {
  searchParams?: Promise<{ category?: string; page?: string; query?: string }>;
}) => {
  const params = await searchParams;
  const currentCategory = params?.category || "";
  const currentPage = Number(params?.page) || 1;
  const query = params?.query || "";

  return (
    <ProductsPage
      category={currentCategory}
      currentPage={currentPage}
      query={query}
    />
  );
};

export default Page;
