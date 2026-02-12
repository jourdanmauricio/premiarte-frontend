import { z } from "zod";

export const newsletterFormSchema = z.object({
  name: z.string().min(1, "El nombre es requerido"),
  email: z.email("Correo electrónico inválido"),
});

export type NewsletterFormSchema = z.infer<typeof newsletterFormSchema>;

export type NewsletterFormState = {
  success?: boolean;
  message?: string;
  data?: {
    name: string;
    email: string;
  };
  zodErrors?: {
    identifier?: string[];
    name?: string[];
    email?: string[];
  } | null;
  formError?: string | null;
};
