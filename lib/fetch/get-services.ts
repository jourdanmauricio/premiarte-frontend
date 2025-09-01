import { StrapiProducts, StrapiServices } from '@/lib/types/strapi';
import { queryServer } from '@/lib/fetch/strapi-server';

const { STRAPI_HOST } = process.env;

export function getServices() {
  return queryServer<StrapiServices>('service').then((res) => {
    const services = {
      ...res.data,
      service: res.data.service.map((service) => ({
        ...service,
        image: {
          url: service.image.url.includes('https')
            ? service.image.url
            : `${STRAPI_HOST}${service.image.url}`,
          alt: service.image.alternativeText || service.title,
        },
      })),
    };

    return services;
  });
}
