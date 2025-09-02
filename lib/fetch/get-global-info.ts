import { StrapiGlobal } from '@/lib/types/strapi';
import { queryServer } from '@/lib/fetch/strapi-server';

const { STRAPI_HOST } = process.env;

export function getGlobalInfo() {
  return queryServer<StrapiGlobal>('global').then((res) => {
    const {
      id,
      documentId,
      siteName,
      siteDescription,
      defaultSeo,
      favicon: rawFavicon,
      banner,
      header,
      footer,
    } = res.data;
    const favicon = rawFavicon ? rawFavicon.url : '';
    const logo =
      header?.logo && header?.logo.image.url.includes('https')
        ? header.logo.image.url
        : `${STRAPI_HOST}${header.logo.image.url}`;
    const mediaImage = defaultSeo?.shareImage ? `${STRAPI_HOST}${defaultSeo?.shareImage?.url}` : '';

    return {
      id,
      documentId,
      siteName,
      siteDescription,
      defaultSeo,
      favicon,
      logo,
      mediaImage,
      metaTitle: defaultSeo?.metaTitle,
      metaDescription: defaultSeo?.metaDescription,
      banner,
      header,
      footer,
    };
  });
}
