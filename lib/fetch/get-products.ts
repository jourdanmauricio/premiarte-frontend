import { StrapiProducts } from '@/lib/types/strapi';
import { queryServer } from '@/lib/fetch/strapi-server';

type getProductsProps = {
  featured?: boolean;
  categoryId?: string;
  page: string | undefined;
  pageSize: number;
};

const { STRAPI_HOST } = process.env;

export function getProducts({
  featured = false,
  categoryId,
  page = '1',
  pageSize,
}: getProductsProps) {
  let url = 'products';

  if (page) url += `?pagination[page]=${page}`;
  if (pageSize) url += `&pagination[pageSize]=${pageSize}`;
  if (categoryId) url += `&filters[categories][slug][$contains]=${categoryId}`;

  console.log('URL', url);

  return queryServer<StrapiProducts[]>(url).then((res) => {
    const response = featured ? res.data.filter((prod) => prod.featured) : res.data;

    const products = response.map((prod) => ({
      ...prod,
      images: prod.images[0].url.includes('https')
        ? prod.images.map((image) => ({
            url: `${image.url}`,
            alt: image.alternativeText || prod.name,
          }))
        : prod.images.map((image) => ({
            url: `${STRAPI_HOST}${image.url}`,
            alt: image.alternativeText || prod.name,
          })),
    }));
    return { products, pagination: res.meta?.pagination };
  });
}
