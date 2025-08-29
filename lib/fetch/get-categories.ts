import { StrapiCategory } from '@/lib/types/strapi';
import { queryServer } from '@/lib/fetch/strapi-server';

const { STRAPI_HOST } = process.env;

type getCategoriesProps = {
  featured?: boolean;
};

export function getCategories({ featured = false }: getCategoriesProps) {
  return queryServer<StrapiCategory[]>('categories').then((res) => {
    const categories = featured ? res.data.filter((cat) => cat.featured) : res.data;

    return categories.map((category) => {
      const { id, name, slug, description, image: rowImage, featured } = category;
      const image = `${STRAPI_HOST}${rowImage.url}`;
      return { id, name, slug, description, image, featured };
    });
  });
}
