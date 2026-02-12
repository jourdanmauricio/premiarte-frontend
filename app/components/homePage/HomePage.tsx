import { HomeCarousel } from "@/app/components/homePage/Carousel";
import { FeaturedCategories } from "@/app/components/homePage/FeaturedCategories";
import FeaturedProducts from "@/app/components/homePage/FeaturedProducts";
import Hero from "@/app/components/homePage/Hero";
import { NewsletterSection } from "@/app/components/homePage/NewsletterSection";
import { Services } from "@/app/components/homePage/Services";
import { Testimonials } from "@/app/components/homePage/Testimonials";
import { ServicesSettings, SliderSettings } from "@/app/shared/types";

const apiUrl = process.env.API_URL;

/* Settings data */
const data = await fetch(`${apiUrl}/settings/page/home`, {
  next: {
    tags: ["home-slider", "home-settings"],
  },
});
const homeSettings = await data.json();

/* Slider settings */
const sliderSettings = homeSettings.slider;
const sliderWithImages = await Promise.all(
  sliderSettings.map(async (sliderSetting: SliderSettings) => {
    if (sliderSetting.image) {
      const imageData = await fetch(`${apiUrl}/images/${sliderSetting.image}`, {
        next: { tags: ["home-slider"] },
      });
      const imageDataJson = await imageData.json();

      if (imageDataJson) {
        return {
          ...sliderSetting,
          imageDet: {
            url: imageDataJson.url,
            alt: imageDataJson.alt,
          },
        };
      }
    }
    return sliderSetting;
  }),
);

/* Hero settings */
const heroSettings = homeSettings.hero;

const heroImageLogoData = await fetch(
  `${apiUrl}/images/${heroSettings.logoId}`,
  {
    next: { tags: ["home-hero"] },
  },
);
const heroImageLogoDataJson = await heroImageLogoData.json();

const heroImageData = await fetch(`${apiUrl}/images/${heroSettings.imageId}`, {
  next: { tags: ["home-hero"] },
});
const heroImageDataJson = await heroImageData.json();

heroSettings.logoDet = {
  url: heroImageLogoDataJson.url,
  alt: heroImageLogoDataJson.alt,
};
heroSettings.imageDet = {
  url: heroImageDataJson.url,
  alt: heroImageDataJson.alt,
};

/* Featured products settings */
const featuredProductsSettings = homeSettings.featuredProducts;

const featuredProducts = await fetch(`${apiUrl}/products?isFeatured=true`, {
  next: { tags: ["featured-products"] },
});
const featuredProductsJson = await featuredProducts.json();

/* Services settings */
const servicesData = homeSettings.services;

const servicesDataJson = await Promise.all(
  servicesData.services.map(async (service: ServicesSettings) => {
    const imageData = await fetch(`${apiUrl}/images/${service.image}`, {
      next: { tags: ["services"] },
    });
    const imageDataJson = await imageData.json();
    return {
      ...service,
      imageDet: {
        url: imageDataJson.url,
        alt: imageDataJson.alt,
      },
    };
  }),
);

/* Featured categories settings */
const featuredCategoriesData = homeSettings.featuredCategories;
// console.log("featuredCategoriesData", featuredCategoriesData);

const featuredCategoriesJson = await fetch(
  `${apiUrl}/categories?isFeatured=true`,
  {
    next: { tags: ["featured-categories"] },
  },
);
const featuredCategories = await featuredCategoriesJson.json();

/* Testimonials settings */
const testimonialsData = homeSettings.testimonials;
// console.log("testimonialsData", testimonialsData);

const HomePage = () => {
  return (
    <>
      <HomeCarousel sliderSettings={sliderWithImages} />
      <div className="max-w-7xl mx-auto">
        <Hero heroSettings={heroSettings} />
        <FeaturedProducts
          featuredProducts={featuredProductsSettings}
          products={featuredProductsJson.data}
        />
        <Services services={servicesDataJson} servicesData={servicesData} />
        <FeaturedCategories
          featuredCategories={featuredCategories}
          featuredCategoriesData={featuredCategoriesData}
        />
        <Testimonials testimonialsData={testimonialsData} />

        <NewsletterSection />
      </div>
    </>
  );
};

export { HomePage };
