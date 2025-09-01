import { StrapiCategory } from '@/lib/types/strapi';
import { queryServer } from '@/lib/fetch/strapi-server';

const { STRAPI_HOST } = process.env;

type getCategoriesProps = {
  featured?: boolean;
  page?: string | undefined;
  pageSize?: number;
};

export function getCategories({ featured = false, page = '1', pageSize }: getCategoriesProps) {
  let url = 'categories';

  if (page) url += `?pagination[page]=${page}`;
  if (pageSize) url += `&pagination[pageSize]=${pageSize}`;

  return queryServer<StrapiCategory[]>(url).then((res) => {
    const response = featured ? res.data.filter((cat) => cat.featured) : res.data;

    const categories = response.map((cat) => ({
      ...cat,
      image: cat.image.url.includes('https') ? cat.image.url : `${STRAPI_HOST}${cat.image.url}`,
      productsCount: cat.products.count,
    }));

    return {
      categories,
      pagination: res.meta?.pagination || {
        page: 1,
        pageSize: 1,
        pageCount: 1,
        total: 1,
      },
    };
  });
}
