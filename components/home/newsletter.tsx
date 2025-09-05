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
    <section className='relative overflow-hidden py-24'>
      {/* Background sofisticado más oscuro */}
      <div className='absolute inset-0'>
        {/* Gradiente principal más oscuro */}
        {/* <div className='absolute inset-0 bg-gradient-to-br from-black via-gray-950 to-black'></div> */}

        {/* Gradiente para esfumar la parte superior */}
        {/* <div className='absolute inset-0 bg-gradient-to-b from-transparent via-black/50 to-black'></div> */}

        {/* Gradientes de color superpuestos más sutiles */}
        {/* <div className='via-orange-500/8 to-red-700/12 absolute inset-0 bg-gradient-to-r from-red-900/10'></div> */}

        {/* Efectos geométricos reposicionados */}
        <div className='absolute left-1/4 top-1/2 h-96 w-96 rounded-full bg-red-600/10 blur-3xl'></div>
        <div className='absolute bottom-1/4 right-1/4 h-80 w-80 rounded-full bg-orange-500/5 blur-3xl'></div>

        {/* Líneas decorativas */}
        <div className='absolute right-0 top-0 h-full w-px origin-top -rotate-12 transform bg-gradient-to-b from-orange-700/30 via-red-900/20 to-transparent'></div>
        <div className='absolute bottom-0 left-0 h-px w-full origin-left rotate-6 transform bg-gradient-to-r from-transparent via-red-600/30 to-transparent'></div>
      </div>

      <div className='container relative z-10 px-4 md:px-6'>
        <div className='flex flex-col items-center space-y-8 text-center'>
          {/* Título mejorado */}
          <div className='space-y-4'>
            <h2 className='font-montserrat text-3xl font-semibold text-white md:text-4xl lg:text-5xl'>
              <span className='bg-gradient-to-r from-orange-400 via-red-500 to-orange-600 bg-clip-text text-transparent'>
                Suscríbete
              </span>{' '}
              <span className='text-gray-200'>a nuestro boletín</span>
            </h2>
            <p className='max-w-2xl text-lg leading-relaxed text-gray-300 md:text-xl'>
              Suscríbete para recibir ofertas especiales, obsequios y consejos para tus agasajos.
            </p>
          </div>

          {/* Formulario mejorado */}
          <div className='w-full max-w-md'>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(handleSubmit)} className='space-y-6' noValidate>
                <div className='space-y-4'>
                  <InputField
                    label=''
                    name='name'
                    type='text'
                    placeholder='Ingresa tu nombre'
                    className='w-full rounded-lg px-4 py-4 text-lg text-white placeholder:text-gray-400'
                    maxLength={50}
                  />
                  <InputField
                    label=''
                    type='email'
                    name='email'
                    placeholder='Ingresa tu email'
                    className='w-full rounded-lg px-4 py-4 text-lg text-white placeholder:text-gray-400'
                    minLength={50}
                  />
                </div>

                <Button
                  type='submit'
                  className='w-full rounded-lg bg-gradient-to-r from-red-600 to-orange-600 px-8 py-4 text-lg font-semibold text-white shadow-xl transition-all duration-300 hover:scale-105 hover:from-red-700 hover:to-orange-700 hover:shadow-2xl disabled:transform-none disabled:cursor-not-allowed disabled:opacity-50'
                  disabled={isPending}
                >
                  {isPending ? (
                    <div className='flex items-center gap-2'>
                      <div className='h-5 w-5 animate-spin rounded-full border-2 border-white/30 border-t-white'></div>
                      Suscribiendo...
                    </div>
                  ) : (
                    'Suscríbete'
                  )}
                </Button>
              </form>
            </Form>
          </div>

          {/* Texto legal mejorado */}
          <p className='max-w-md text-sm leading-relaxed text-gray-400'>
            Al suscribirse, acepta nuestros{' '}
            <span className='cursor-pointer text-orange-400 transition-colors hover:text-orange-300'>
              Términos de servicio
            </span>{' '}
            y{' '}
            <span className='cursor-pointer text-orange-400 transition-colors hover:text-orange-300'>
              Política de privacidad
            </span>
            .
          </p>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;
