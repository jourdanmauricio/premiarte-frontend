'use client';

import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { Form } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { InputField } from '@/components/ui/custom/input-filed';
import { useMutation } from '@tanstack/react-query';
import { toast } from '@/hooks/use-toast';
import { query } from '@/lib/fetch/strapi';

const newsletterSchema = z.object({
  name: z.string().min(1, 'El nombre es requerido'),
  email: z
    .string()
    .min(1, 'El correo electrónico es requerido')
    .email('Correo electrónico inválido'),
});

const Newsletter = () => {
  const form = useForm<z.infer<typeof newsletterSchema>>({
    resolver: zodResolver(newsletterSchema),
    defaultValues: {
      name: '',
      email: '',
    },
  });

  const { mutate: postSubscriber, isPending } = useMutation({
    mutationFn: async (data: z.infer<typeof newsletterSchema>) => {
      const response = await query('subscribers', {
        method: 'POST',
        body: { data }, // Enviar directamente los datos
      });
      return response;
    },
    onSuccess: () => {
      form.reset();
      toast({
        title: 'Suscripción exitosa',
        description: 'Gracias por suscribirte a nuestro boletín',
      });
    },
    onError: (error: any) => {
      toast({
        title: 'Error',
        description: error.message || 'Error al suscribirte',
        variant: 'destructive',
      });
    },
  });

  const handleSubmit = (data: z.infer<typeof newsletterSchema>) => {
    postSubscriber(data);
  };

  return (
    <section className='bg-muted bg-orange-400 py-20 text-background/70'>
      <div className='container px-4 md:px-6'>
        <div className='flex flex-col items-center space-y-4 text-center md:space-y-6'>
          <h2 className='text-2xl font-semibold tracking-tight md:text-3xl'>
            Suscríbete a nuestro boletín
          </h2>
          <p className='max-w-[600px] md:text-lg'>
            Suscríbete para recibir ofertas especiales, obsequios y consejos para tus agasajos.
          </p>

          <div className='flex w-full max-w-[400px] flex-col'>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(handleSubmit)} noValidate>
                <InputField
                  label=''
                  name='name'
                  type='text'
                  placeholder='Ingresa tu nombre'
                  className='w-full text-foreground'
                  maxLength={50}
                />
                <InputField
                  label=''
                  type='email'
                  name='email'
                  placeholder='Ingresa tu email'
                  className='text-foreground'
                  minLength={50}
                />
                <Button
                  variant='default'
                  type='submit'
                  className='mt-2 w-full'
                  disabled={isPending}
                >
                  {isPending ? 'Suscribiendo...' : 'Suscríbete'}
                </Button>
              </form>
            </Form>
          </div>

          <p className='text-xs text-background/70'>
            Al suscribirse, acepta nuestros Términos de servicio y Política de privacidad.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;
