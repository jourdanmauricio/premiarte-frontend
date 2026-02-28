import { FeaturedCategory, HomeSettings } from "@/app/shared/types";
import { Link } from "next-view-transitions";
import Subtitle from "../shared/Subtitle";
import { CategoryCard } from "@/components/shared/CategoryCard";

type FeaturedCategoriesProps = {
  homeSettings: HomeSettings;
};

const apiUrl = process.env.API_URL;

const FeaturedCategories = async ({
  homeSettings,
}: FeaturedCategoriesProps) => {
  /* Featured categories settings */
  const featuredCategoriesData = homeSettings.featuredCategories;

  const featuredCategoriesJson = await fetch(
    `${apiUrl}/categories?isFeatured=true`,
    {
      next: { tags: ["featured-categories"] },
    },
  );
  const featuredCategories: FeaturedCategory[] =
    await featuredCategoriesJson.json();

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
                <Link
                  href={featuredCategoriesData.buttonLink}
                  className="border border-input bg-background hover:bg-accent hover:text-accent-foreground inline-flex
          items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background
          transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring
          focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none
          [&_svg]:size-4 [&_svg]:shrink-0 px-6 py-4"
                >
                  <span className="text-xl text-orange-500">
                    {featuredCategoriesData.buttonText}
                  </span>
                </Link>
              </div>
            )}
        </div>
      </div>
    </section>
  );
};

export { FeaturedCategories };
