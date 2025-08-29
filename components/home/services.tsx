import { Card, CardContent } from '@/components/ui/card';
import { getServices } from '@/lib/fetch/get-services';
import { BlocksRenderer } from '@strapi/blocks-react-renderer';
import Image from 'next/image';

const Services = async () => {
  const services = await getServices();

  return (
    <section className='bg-muted py-12 md:py-16'>
      <div className='container px-4 md:px-6'>
        <h2 className='mb-8 text-center text-2xl font-bold tracking-tight md:text-3xl'>
          {services.title || 'Nuestros Servicios'}
        </h2>
        <p className='mb-8 text-center text-xl font-medium tracking-tight md:text-xl'>
          {services.subtitle || 'Servicios destacados'}
        </p>
        <div className='flex flex-wrap justify-center gap-6'>
          {services.service.map((serv) => (
            <Card key={serv.id} className='max-w-64 bg-background'>
              <CardContent className='flex flex-col items-center px-2 py-6 text-center'>
                <Image
                  src={serv.image.url}
                  alt={serv.image.alt || serv.title}
                  width={100}
                  height={100}
                  className='mb-4 h-10 w-10 object-cover'
                />
                <h3 className='mb-2 text-lg font-semibold'>{serv.title}</h3>
                <div className='text-muted-foreground md:text-sm'>
                  <BlocksRenderer content={serv.description} />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export { Services };
