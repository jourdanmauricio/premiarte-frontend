import { ProductsList } from "@/app/components/productsPage/ProductsList";
import { ProductsSidebar } from "@/app/components/productsPage/ProductsSidebar";
import { CustomPagination } from "@/app/components/shared/CustomPagination";

import { Suspense } from "react";

const apiUrl = process.env.API_URL;
const ITEMS_PER_PAGE = 9;

const categoriesData = await fetch(`${apiUrl}/categories`, {
  next: {
    tags: ["categories"],
  },
});
const categories = await categoriesData.json();

// console.log("Products", products);

const ProductsPage = async ({
  category,
  currentPage,
}: {
  category: string;
  currentPage: number;
}) => {
  const currentCategory = category ? category : "";
  console.log("currentCategory", currentCategory);
  console.log("currentPage", currentPage);

  /* Products data */
  const productsData = await fetch(
    `${apiUrl}/products?category=${currentCategory}&page=${currentPage}&isActive=true`,
    {
      next: {
        tags: ["products"],
      },
    },
  );

  const productsDataJson = await productsData.json();
  console.log("productsDataJson", productsDataJson);
  const products = productsDataJson.data;
  const totalProducts = productsDataJson.total;

  return (
    <div className="container mx-auto max-w-[1200px]">
      <div className="space-y-6">
        {/* <!-- <h2 class='text-lg font-medium'>Productos</h2> --> */}
        <div className="space-y-4">
          <div className="flex gap-4 md:flex-row">
            <ProductsSidebar categories={categories} />

            <main className="w-full mb-8">
              {/* TODO: products skeleton */}
              <Suspense
                key={currentCategory + currentPage}
                fallback={<div>Loading...</div>}
              >
                <ProductsList products={products} />
              </Suspense>
              {totalProducts > ITEMS_PER_PAGE && (
                <CustomPagination
                  total={totalProducts}
                  currentPage={currentPage}
                  categorySlug={currentCategory}
                />
              )}
            </main>
          </div>
        </div>
      </div>
    </div>
  );
};

export { ProductsPage };
