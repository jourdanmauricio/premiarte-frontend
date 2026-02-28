import { redirect } from "next/navigation";
import { Suspense } from "react";
import { Category as CategoryType } from "@/app/shared/types";
import { ProductsList } from "@/components/productsPage/ProductsList";
import { ProductsSidebar } from "@/components/productsPage/ProductsSidebar";
import { ProductsSkeleton } from "@/components/productsPage/ProductsSkeleton";
import { CustomPagination } from "@/components/shared/CustomPagination";

const apiUrl = process.env.API_URL;
const ITEMS_PER_PAGE = 9;

const ProductsContent = async ({
  category,
  currentPage,
}: {
  category: string;
  currentPage: number;
}) => {
  const currentCategory = category ? category : "";

  const productsData = await fetch(
    `${apiUrl}/products?category=${currentCategory}&page=${currentPage}&isActive=true`,
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
      <ProductsList products={products} />
      {totalProducts > ITEMS_PER_PAGE && (
        <CustomPagination
          total={totalProducts}
          currentPage={currentPage}
          categorySlug={currentCategory}
        />
      )}
    </>
  );
};

const ProductsPage = async ({
  category,
  currentPage,
}: {
  category: string;
  currentPage: number;
}) => {
  const currentCategory = category ? category : "";

  const categoriesData = await fetch(`${apiUrl}/categories`, {
    next: {
      tags: ["categories"],
    },
  });
  const categories = await categoriesData.json();

  if (currentCategory) {
    const categoryExists = categories.some(
      (cat: CategoryType) => cat.slug === currentCategory,
    );
    if (!categoryExists) {
      redirect("/productos");
    }
  }

  return (
    <div className="container mx-auto max-w-[1400px] px-4">
      <div className="space-y-6">
        <div className="space-y-4">
          <div className="flex flex-col gap-4 md:flex-row">
            <ProductsSidebar categories={categories} />

            <main className="w-full mb-8">
              <Suspense
                key={currentCategory + currentPage}
                fallback={<ProductsSkeleton />}
              >
                <ProductsContent
                  category={currentCategory}
                  currentPage={currentPage}
                />
              </Suspense>
            </main>
          </div>
        </div>
      </div>
    </div>
  );
};

export { ProductsPage };
