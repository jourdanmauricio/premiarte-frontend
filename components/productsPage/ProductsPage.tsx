import { ProductsList } from "@/components/productsPage/ProductsList";
import { ProductsSidebar } from "@/components/productsPage/ProductsSidebar";
import { ProductsSkeleton } from "@/components/productsPage/ProductsSkeleton";
import { CustomPagination } from "@/components/shared/CustomPagination";

import { Suspense } from "react";

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

  return (
    <div className="container mx-auto max-w-[1200px]">
      <div className="space-y-6">
        <div className="space-y-4">
          <div className="flex gap-4 md:flex-row">
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
