import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Hero } from '@/components/home/hero';
import { Categories } from '@/components/home/categories';
import { getHomeInfo } from '@/lib/fetch/get-home-info';
import { FeaturedProducts } from '@/components/home/featured-products';
import { Services } from '@/components/home/services';
import { Testimonials } from '@/components/home/testimonials';
import Newsletter from '@/components/home/newsletter';

export default async function HomePage() {
  const { title, description, image, categoriesTitle, productsTitle } = await getHomeInfo();

  return (
    <main className='flex-1'>
      {/* Hero Banner */}
      <Hero title={title} description={description} image={image} />

      {/* Product Categories */}
      <Categories categoriesTitle={categoriesTitle} />

      {/* Featured Products */}
      <FeaturedProducts productsTitle={productsTitle} />

      {/* Services */}
      <Services />

      {/* Testimonials */}
      <Testimonials />

      {/* Newsletter */}
      <Newsletter />
    </main>
  );
}
