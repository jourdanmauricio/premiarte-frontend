import { StrapiReviews } from '@/lib/types/strapi';
import { queryServer } from '@/lib/fetch/strapi-server';

export function getReviews() {
  return queryServer<StrapiReviews>('review').then((res) => {
    return res.data;
  });
}
