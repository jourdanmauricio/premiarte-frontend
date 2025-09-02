export interface StrapiResponse<T> {
  data: T;
  meta?: {
    pagination?: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}

export interface StrapiImage {
  url: string;
  alternativeText?: string;
  caption?: string;
  width?: number;
  height?: number;
  formats?: {
    thumbnail?: StrapiImage;
    small?: StrapiImage;
    medium?: StrapiImage;
    large?: StrapiImage;
  };
}

export interface StrapiCategory {
  id: number;
  documentId?: string;
  name: string;
  slug: string;
  description?: string;
  image: StrapiImage;
  featured: boolean;
  products: {
    count: number;
  };
}

export interface slider {
  button: {
    href: string;
    id: number;
    isButtonLink: boolean;
    isExternal: boolean;
    label: string;
    type: string;
  };
  card: {
    id: number;
    description: RootNode[];
    image: {
      alternativeText: string;
      documentId: string;
      height: number;
      id: number;
      name: string;
      url: string;
      width: number;
    };
    title: string;
  };
}
export interface StrapiHome {
  id: number;
  documentId: string;
  title: string;
  description: RootNode[];
  cover: StrapiImage;
  categoriesTitle: string;
  productsTitle: string;
  slider: slider[];
}

interface Link {
  id: number;
  href: string;
  label: string;
  isExternal: boolean;
  isButtonLink: boolean;
  type: string | null;
}

interface Image {
  id: number;
  documentId: string;
  alternativeText: string | null;
  url: string;
}

interface Logo {
  id: number;
  label: string;
  href: string;
  isExternal: boolean;
  image: Image;
}

interface NavItem extends Link {}

interface SocialLink extends Link {
  image: Image;
}

interface TextContent {
  type: string;
  children: Array<{
    type: string;
    text: string;
  }>;
}

interface BannerDto {
  id: number;
  isVisible: boolean;
  description: string;
  link: Link;
}

interface HeaderDto {
  id: number;
  logo: Logo;
}

interface FooterDto {
  id: number;
  textReserved: string;
  description: RootNode[];
  logo: Logo;
  socialLinks: SocialLink[];
  design: Link[];
}

interface StrapiGlobal {
  id: number;
  documentId: string;
  siteName: string;
  siteDescription: string;
  defaultSeo: {
    metaTitle: string;
    metaDescription: string;
    shareImage?: StrapiImage;
  };
  favicon?: StrapiImage;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  banner: BannerDto;
  header: HeaderDto;
  footer: FooterDto;
}

interface StrapiProducts {
  id: number;
  documentId: string;
  name: string;
  slug: string;
  isActive: boolean;
  description: RootNode[];
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  featured: boolean;
  sku: string;
  images: Image[];
  categories: Category[];
}

interface ServiceItemDto {
  id: number;
  title: string;
  description: RootNode[];
  image: Image;
}

interface StrapiServices {
  id: number;
  documentId: string;
  title: string;
  subtitle: string;
  service: ServiceItemDto[];
}

interface TestimonialDto {
  id: number;
  name: string;
  description: string;
  rating: number;
}
interface StrapiReviews {
  id: number;
  documentId: string;
  title: string;
  rating: TestimonialDto[];
}

export type Category = {
  id: number;
  name: string;
  slug: string;
  description?: string;
  image: string;
  featured: boolean;
};

export type Product = {
  id: number;
  documentId: string;
  name: string;
  slug: string;
  isActive: boolean;
  // description: RootNode[];
  description: any;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  featured: boolean;
  sku: string;
  images: {
    url: string;
    alt: string;
  }[];
  categories: Category[];
};

export type Products = {
  pagination:
    | {
        page: number;
        pageSize: number;
        pageCount: number;
        total: number;
      }
    | undefined;
  products: Product[];
};
