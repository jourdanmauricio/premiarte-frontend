import { z } from "zod";

export const contactFormSchema = z.object({
  name: z.string().min(1, "El nombre es requerido"),
  email: z
    .string()
    .optional()
    .refine(
      (val) => !val || z.string().email().safeParse(val).success,
      "Correo electrónico inválido",
    ),
  phone: z.string().min(1, "El teléfono es requerido"),
  message: z.string().min(1, "El mensaje es requerido"),
});

export type ContactFormState = {
  success?: boolean;
  message?: string;
  data?: {
    name: string;
    email: string;
    phone: string;
    message: string;
  };
  zodErrors?: {
    identifier?: string[];
    name?: string[];
    email?: string[];
    phone?: string[];
    message?: string[];
  } | null;
  formError?: string | null;
};
