import { StrapiHome } from '@/lib/types/strapi';
import { queryServer } from '@/lib/fetch/strapi-server';

const { STRAPI_HOST } = process.env;

export function getHomeInfo() {
  return queryServer<StrapiHome>('home?populate=cover').then((res) => {
    const homeInfo = {
      ...res.data,
      image: {
        url: `${STRAPI_HOST}${res.data.cover.url}`,
        alt: res.data.cover.alternativeText || res.data.title,
      },
    };
    return homeInfo;
  });
}
