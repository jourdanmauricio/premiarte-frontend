import { Product } from "@/app/shared/types";
import { z } from "zod";

export const budgetFormSchema = z.object({
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
  products: z.array(
    z.object({
      id: z.coerce.number(),
      slug: z.string(),
      name: z.string(),
      quantity: z.coerce.number(),
      image: z.string().optional().default(""),
    }),
  ),
});

export type BudgetFormSchema = z.infer<typeof budgetFormSchema>;

export type BudgetFormState = {
  success?: boolean;
  message?: string;
  data?: {
    name: string;
    email: string;
    phone: string;
    message: string;
    products: Product[];
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
