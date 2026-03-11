import { Suspense } from "react";

import { CategoryList } from "@/components/productsPage/CategoryList";
import { ProductsList } from "@/components/productsPage/ProductsList";
import { SearchProducts } from "@/components/productsPage/SearchProducts";
import { ProductsSkeleton } from "@/components/productsPage/ProductsSkeleton";
import { CategoriesListSkeleton } from "@/components/productsPage/categoriesListSkeleton";

const ProductsContent = async ({
  category,
  currentPage,
  query,
}: {
  category: string;
  currentPage: number;
  query: string;
}) => {
  const currentCategory = category ? category : "";

  return (
    <>
      <ProductsList
        currentCategory={currentCategory}
        currentPage={currentPage}
        category={category}
        query={query}
      />
    </>
  );
};

const ProductsPage = async ({
  category,
  currentPage,
  query,
}: {
  category: string;
  currentPage: number;
  query: string;
}) => {
  const currentCategory = category ? category : "";

  return (
    <div className="container mx-auto max-w-[1400px] px-4">
      <div className="space-y-6">
        <div className="space-y-4">
          <div className="flex flex-col gap-4 md:flex-row">
            <Suspense
              key={currentCategory}
              fallback={<CategoriesListSkeleton />}
            >
              <CategoryList currentCategory={currentCategory} />
            </Suspense>

            <main className="w-full mb-8">
              <SearchProducts className="mt-8" placeholder="Buscar productos" />
              <Suspense
                key={currentCategory + currentPage + query}
                fallback={<ProductsSkeleton />}
              >
                <ProductsContent
                  category={currentCategory}
                  currentPage={currentPage}
                  query={query}
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
