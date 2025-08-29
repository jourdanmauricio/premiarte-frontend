import { StrapiProducts, StrapiReviews, StrapiServices } from '@/lib/types/strapi';
import { query } from './strapi';
import { queryServer } from '@/lib/fetch/strapi-server';

const { STRAPI_HOST } = process.env;

export function getReviews() {
  return queryServer<StrapiReviews>('review').then((res) => {
    return res.data;
  });
}
