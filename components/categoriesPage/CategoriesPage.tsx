import { CategoryCard } from "@/components/categoriesPage/CategoryCard";
import { Category } from "@/app/shared/types";

const apiUrl = process.env.API_URL;

/* Categories data */
const data = await fetch(`${apiUrl}/categories`, {
  next: {
    tags: ["categories"],
  },
});
const categories = await data.json();

const CategoriesPage = () => {
  return (
    <div className="container mx-auto max-w-[1200px]">
      {/* <!-- <h2 class='text-lg font-medium'></h2>Categorías --> */}

      <section className="relative px-4 md:px-20 pb-8">
        <div className="flex flex-col items-center gap-12 lg:gap-16">
          <div className="flex flex-wrap justify-center gap-12 pt-16">
            {categories.map((category: Category) => (
              <CategoryCard key={category.id} category={category} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export { CategoriesPage };
