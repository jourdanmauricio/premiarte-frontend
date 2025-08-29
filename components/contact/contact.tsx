'use client';

import z from 'zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { MapPin, Phone, Mail } from 'lucide-react';
import { zodResolver } from '@hookform/resolvers/zod';

import { query } from '@/lib/fetch/strapi';
import { toast } from '@/hooks/use-toast';
import { Form } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { useMutation } from '@tanstack/react-query';
import { Card, CardContent } from '@/components/ui/card';
import InputField from '@/components/ui/custom/input-filed';
import TextareaField from '@/components/ui/custom/textarea-field';

const contactFormSchema = z.object({
  name: z.string().min(1, 'El nombre es requerido'),
  email: z
    .string()
    .min(1, 'El correo electrónico es requerido')
    .email('Correo electrónico inválido'),
  phone: z.string().optional(),
  message: z.string().min(1, 'El mensaje es requerido'),
});

export default function Contact() {
  const [isSubmitted, setIsSubmitted] = useState(false);

  const form = useForm<z.infer<typeof contactFormSchema>>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      message: '',
    },
  });

  const { mutate: postContact, isPending } = useMutation({
    mutationFn: async (data: z.infer<typeof contactFormSchema>) => {
      const response = await query('contacts', {
        method: 'POST',
        body: { data },
      });
      return response;
    },
    onSuccess: () => {
      form.reset();
      toast({
        title: 'Mensaje enviado exitosamente',
        description: 'Gracias por contactarnos',
      });
      setIsSubmitted(true);
      setTimeout(() => {
        setIsSubmitted(false);
      }, 3000);
    },
    onError: (error: any) => {
      toast({
        title: 'Error',
        description: error.message || 'Error enviando el mensaje',
        variant: 'destructive',
      });
    },
  });

  const handleSubmit = (data: z.infer<typeof contactFormSchema>) => {
    postContact(data);
  };

  return (
    <div className='container px-4 py-8 md:px-6 md:py-12'>
      <div className='mb-8'>
        <h1 className='mb-2 text-3xl font-bold'>Contáctanos</h1>
      </div>

      <div className='grid gap-8 md:grid-cols-3'>
        <div className='md:col-span-2'>
          <Card>
            <CardContent className='p-6'>
              {isSubmitted ? (
                <div className='mb-6 rounded-lg bg-primary/10 p-4 text-primary'>
                  <h3 className='mb-2 text-lg font-semibold'>Gracias por contactarnos!</h3>
                  <p>
                    Tu mensaje ha sido enviado exitosamente. Nos pondremos en contacto contigo lo
                    antes posible.
                  </p>
                </div>
              ) : (
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(handleSubmit)} className='space-y-4' noValidate>
                    <div className='space-y-2'>
                      <InputField
                        id='name'
                        name='name'
                        label='Nombre y apellido*'
                        placeholder='Nombre'
                      />
                    </div>

                    <div className='space-y-2'>
                      <InputField
                        id='email'
                        name='email'
                        label='Email*'
                        placeholder='mail@example.com'
                      />
                    </div>

                    <div className='space-y-2'>
                      <InputField
                        id='phone'
                        name='phone'
                        label='Teléfono'
                        placeholder='(11) 9999-9999'
                      />
                    </div>

                    <div className='space-y-2'>
                      <TextareaField
                        id='message'
                        form={form}
                        name='message'
                        label='Mensaje*'
                        placeholder='Cómo podemos ayudarte?'
                        required
                        rows={4}
                      />
                    </div>

                    <Button
                      type='submit'
                      className='ml-auto block w-full sm:w-auto'
                      disabled={isPending}
                    >
                      {isPending ? 'Enviando mensaje...' : 'Enviar mensaje'}
                    </Button>
                  </form>
                </Form>
              )}
            </CardContent>
          </Card>
        </div>

        <div>
          <Card>
            <CardContent className='p-6'>
              <h2 className='mb-12 text-xl font-semibold'>Información de contacto</h2>

              <div className='space-y-6'>
                <div className='flex items-start gap-3'>
                  <div className='flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary'>
                    <MapPin className='h-5 w-5' />
                  </div>
                  <div>
                    <h3 className='font-medium'>Dirección</h3>
                    <address className='not-italic text-muted-foreground'>
                      123 Pet Street
                      <br />
                      Dogville, NY 10001
                      <br />
                      United States
                    </address>
                  </div>
                </div>

                <div className='flex items-start gap-3'>
                  <div className='flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary'>
                    <Phone className='h-5 w-5' />
                  </div>
                  <div>
                    <h3 className='font-medium'>Teléfono</h3>
                    <p className='text-muted-foreground'>
                      <a href='tel:+(221) 619-6520' className='hover:text-primary'>
                        (221) 619-6520
                      </a>
                    </p>
                  </div>
                </div>

                <div className='flex items-start gap-3'>
                  <div className='flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary'>
                    <Mail className='h-5 w-5' />
                  </div>
                  <div>
                    <h3 className='font-medium'>Email</h3>
                    <p className='text-muted-foreground'>
                      <a href='mailto:info@premiarte.com.ar' className='hover:text-primary'>
                        info@premiarte.com.ar
                      </a>
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className='mt-8'>
            <Card>
              <CardContent className='p-6'>
                <h2 className='mb-8 text-xl font-semibold'>Síguenos en nuestras redes sociales</h2>
                <div className='flex gap-4'>
                  <a
                    href='#'
                    className='flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary transition-colors hover:bg-primary hover:text-primary-foreground'
                  >
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      width='24'
                      height='24'
                      viewBox='0 0 24 24'
                      fill='none'
                      stroke='currentColor'
                      strokeWidth='2'
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      className='h-5 w-5'
                    >
                      <path d='M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z'></path>
                    </svg>
                    <span className='sr-only'>Facebook</span>
                  </a>
                  <a
                    href='#'
                    className='flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary transition-colors hover:bg-primary hover:text-primary-foreground'
                  >
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      width='24'
                      height='24'
                      viewBox='0 0 24 24'
                      fill='none'
                      stroke='currentColor'
                      strokeWidth='2'
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      className='h-5 w-5'
                    >
                      <rect x='2' y='2' width='20' height='20' rx='5' ry='5'></rect>
                      <path d='M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z'></path>
                      <line x1='17.5' y1='6.5' x2='17.51' y2='6.5'></line>
                    </svg>
                    <span className='sr-only'>Instagram</span>
                  </a>
                  <a
                    href='#'
                    className='flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary transition-colors hover:bg-primary hover:text-primary-foreground'
                  >
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      width='24'
                      height='24'
                      viewBox='0 0 24 24'
                      fill='none'
                      stroke='currentColor'
                      strokeWidth='2'
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      className='h-5 w-5'
                    >
                      <path d='M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z'></path>
                    </svg>
                    <span className='sr-only'>Twitter</span>
                  </a>
                  <a
                    href='#'
                    className='flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary transition-colors hover:bg-primary hover:text-primary-foreground'
                  >
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      width='24'
                      height='24'
                      viewBox='0 0 24 24'
                      fill='none'
                      stroke='currentColor'
                      strokeWidth='2'
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      className='h-5 w-5'
                    >
                      <path d='M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z'></path>
                      <rect x='2' y='9' width='4' height='12'></rect>
                      <circle cx='4' cy='4' r='2'></circle>
                    </svg>
                    <span className='sr-only'>LinkedIn</span>
                  </a>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
