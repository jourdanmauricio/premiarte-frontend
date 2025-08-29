import { StrapiCategory } from '@/lib/types/strapi';
import { query } from './strapi';

type postSubscriberProps = {
  email: string;
  name: string;
};

export function postSubscriber({ email, name }: postSubscriberProps) {
  return query<StrapiCategory[]>('subscribers', {
    method: 'POST',
    body: { email, name },
  });
}
