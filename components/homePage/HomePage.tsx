import { HomeCarousel } from "@/components/homePage/Carousel";
import { FeaturedCategories } from "@/components/homePage/FeaturedCategories";
import FeaturedProducts from "@/components/homePage/FeaturedProducts";
import Hero from "@/components/homePage/Hero";
import { NewsletterSection } from "@/components/homePage/NewsletterSection";
import { Services } from "@/components/homePage/Services";
import { Testimonials } from "@/components/homePage/Testimonials";
import { ServicesSettings, SliderSettings } from "@/app/shared/types";

const apiUrl = process.env.API_URL;

const HomePage = async () => {
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
        const imageData = await fetch(
          `${apiUrl}/images/${sliderSetting.image}`,
          {
            next: { tags: ["home-slider"] },
          },
        );
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

  /* Testimonials settings */
  const testimonialsData = homeSettings.testimonials;

  return (
    <>
      <HomeCarousel sliderSettings={sliderWithImages} />
      <section className="max-w-7xl mx-auto">
        <Hero homeSettings={homeSettings} />
        <FeaturedProducts homeSettings={homeSettings} />
        <Services services={servicesDataJson} servicesData={servicesData} />
        <FeaturedCategories homeSettings={homeSettings} />
        <Testimonials testimonialsData={testimonialsData} />
        <NewsletterSection />
      </section>
    </>
  );
};

export { HomePage };
