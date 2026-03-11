import { Product } from "@/app/shared/types";
import { ProductCard } from "@/components/productsPage/ProductCard";
import { CustomPagination } from "@/components/shared/CustomPagination";
import { redirect } from "next/navigation";

type ProductsListProps = {
  // products: Product[];
  currentCategory: string;
  currentPage: number;
  category: string;
  query: string;
};

const apiUrl = process.env.API_URL;
const ITEMS_PER_PAGE = 9;

const ProductsList = async ({
  currentCategory,
  currentPage,
  category,
  query,
}: ProductsListProps) => {
  const productsData = await fetch(
    `${apiUrl}/products?category=${currentCategory}&query=${query}&page=${currentPage}`,
    {
      next: {
        tags: ["products"],
      },
    },
  );

  const productsDataJson = await productsData.json();
  const products = productsDataJson.data;
  const totalProducts = productsDataJson.total;
  const totalPages = Math.ceil(totalProducts / ITEMS_PER_PAGE);

  if (currentPage > 1 && totalPages > 0 && currentPage > totalPages) {
    const url = category ? `/productos?category=${category}` : "/productos";
    redirect(url);
  }

  return (
    <>
      <div className="flex flex-wrap justify-center gap-16 mt-16">
        {products.map((product: Product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
      {totalProducts > ITEMS_PER_PAGE && (
        <CustomPagination total={totalProducts} />
      )}
    </>
  );
};

export { ProductsList };
