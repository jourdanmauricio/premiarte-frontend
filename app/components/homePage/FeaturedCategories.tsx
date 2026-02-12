import { FeaturedCategoriesData, FeaturedCategory } from "@/app/shared/types";
import Subtitle from "../shared/Subtitle";
import { CategoryCard } from "@/app/components/shared/CategoryCard";

type FeaturedCategoriesProps = {
  featuredCategories: FeaturedCategory[];
  featuredCategoriesData: FeaturedCategoriesData;
};

const FeaturedCategories = ({
  featuredCategories,
  featuredCategoriesData,
}: FeaturedCategoriesProps) => {
  return (
    <section className="section-container">
      <div className="flex flex-col items-center gap-12 lg:gap-16">
        <div className="text-center w-full">
          <Subtitle subtitle={featuredCategoriesData.title} />
          {featuredCategoriesData.text && (
            <div className="text-lg leading-relaxed text-muted-foreground md:text-xl mt-8 w-full">
              <p className="text-center">{featuredCategoriesData.text}</p>
            </div>
          )}

          <div className="flex flex-wrap justify-center gap-8 pt-24">
            {featuredCategories.map((category) => (
              <div key={category.id} className="img-appear group relative w-64">
                <CategoryCard category={category} />
              </div>
            ))}
          </div>

          {featuredCategoriesData.buttonLink &&
            featuredCategoriesData.buttonText && (
              <div className="mt-20 text-center">
                <button
                  className="border border-input bg-background hover:bg-accent hover:text-accent-foreground inline-flex
          items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background
          transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring
          focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none
          [&_svg]:size-4 [&_svg]:shrink-0 px-6 py-4"
                >
                  <a href={featuredCategoriesData.buttonLink}>
                    <span className="text-xl text-orange-500">
                      {featuredCategoriesData.buttonText}
                    </span>
                  </a>
                </button>
              </div>
            )}
        </div>
      </div>
    </section>
  );
};

export { FeaturedCategories };
