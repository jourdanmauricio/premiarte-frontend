import { StrapiHome } from '@/lib/types/strapi';
import { queryServer } from '@/lib/fetch/strapi-server';

const { STRAPI_HOST } = process.env;

export function getHomeInfo() {
  return queryServer<StrapiHome>('home').then((res) => {
    const homeInfo = {
      ...res.data,
      image: {
        url: res.data.cover.url.includes('https')
          ? res.data.cover.url
          : `${STRAPI_HOST}${res.data.cover.url}`,
        alt: res.data.cover.alternativeText || res.data.title,
      },
    };

    console.log('homeInfo', homeInfo);
    return homeInfo;
  });
}
