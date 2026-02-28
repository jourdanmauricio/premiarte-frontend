export type HomeSettings = {
  featuredProducts: FeaturedProductsSettings;
  featuredCategories: FeaturedCategoriesSettings;
  // testimonials: TestimonialsSettings;
  services: ServicesSettings;
  slider: SliderSettings[];
  hero: HeroSettings;
};

export type FeaturedCategoriesSettings = {
  title: string;
  text: string;
  buttonText: string;
  buttonLink: string;
};

export type Category = {
  id: number;
  name: string;
  slug: string;
  image?: {
    url: string;
    alt: string;
  };
  description: string;
};

export type Image = {
  id: number;
  url: string;
  alt: string;
};

export type SliderSettings = {
  image: number;
  title: string;
  recommended: boolean;
  text: string;
  buttonText: string;
  buttonLink: string;
  imageDet?: {
    url: string;
    alt: string;
  };
};

export type HeroSettings = {
  imageId: number;
  title: string;
  text: string;
  buttonText: string;
  buttonLink: string;
  logoId: number;
  logoDet?: {
    url: string;
    alt: string;
  };
  imageDet?: {
    url: string;
    alt: string;
  };
};

export type FeaturedProductsSettings = {
  title: string;
  text: string;
  buttonText: string;
  buttonLink: string;
};

export type Product = {
  id: number;
  name: string;
  description: string;
  stock: number;
  isActive: boolean;
  isFeatured: boolean;
  retailPrice: number;
  wholesalePrice: number;
  slug: string;
  sku: string;
  priceUpdatedAt: string;
  priceUpdated: string | null;
  categories: Category[];
  images: Image[];
  relatedProducts: Product[];
};

export type ServicesData = {
  title: string;
  subtitle: string;
  services: ServicesSettings[];
};

export type ServicesSettings = {
  title: string;
  subtitle: string;
  image: number;
  description: string;
  imageDet?: {
    url: string;
    alt: string;
  };
};

export type FeaturedCategoriesData = {
  title: string;
  text: string;
  buttonText: string;
  buttonLink: string;
};

export type FeaturedCategory = {
  id: number;
  name: string;
  slug: string;
  image?: {
    url: string;
    alt: string;
  };
};

export type Testimonial = {
  name: string;
  rating: string;
  description: string;
};

export type TestimonialsData = {
  title: string;
  testimonials: Testimonial[];
};

export type SocialLink = {
  href: string;
  label: string;
  image: number;
  imageDet?: {
    url: string;
    alt: string;
  };
};

export type FooterData = {
  siteName: string;
  logoId: number;
  siteText: string;
  socialLinks: SocialLink[];
  siteAbout: string;
  siteAboutDescription: string;
  siteAddress: string;
  siteCity: string;
  sitePhone: string;
  siteEmail: string;
};
