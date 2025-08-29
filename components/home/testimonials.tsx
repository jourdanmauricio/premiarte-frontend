import { Card, CardContent } from '@/components/ui/card';
import { getReviews } from '@/lib/fetch/get-reviews';
import { Star, StarHalf } from 'lucide-react';

const Testimonials = async () => {
  const testimonials = await getReviews();

  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;

    for (let i = 1; i <= 5; i++) {
      if (i <= fullStars) {
        stars.push(<Star key={i} className='fill-yellow-400 px-0.5 text-yellow-500' />);
      } else if (i === fullStars + 1 && hasHalfStar) {
        stars.push(<StarHalf key={i} className='fill-yellow-400 px-0.5 text-yellow-500' />);
      }
    }

    return stars;
  };

  return (
    <section className='py-12 md:py-16'>
      <div className='container px-4 md:px-6'>
        <h2 className='mb-8 text-center text-2xl font-bold tracking-tight md:text-3xl'>
          {testimonials.title || 'What Our Customers Say'}
        </h2>
        <div className='grid grid-cols-1 gap-6 md:grid-cols-3'>
          {testimonials.rating.map((testimonial) => (
            <Card key={testimonial.id} className='bg-background'>
              <CardContent className='p-6'>
                <div className='mb-4 flex items-center gap-4'>
                  <div>
                    <h3 className='font-semibold'>{testimonial.name}</h3>
                    <div className='flex'>{renderStars(testimonial.rating)}</div>
                  </div>
                </div>
                <p className='text-muted-foreground'>{testimonial.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export { Testimonials };
