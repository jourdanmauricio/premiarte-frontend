import { z } from "zod";

const budgetProductSchema = z.object({
  id: z.coerce.number(),
  variantId: z.string().nullable().optional(),
  slug: z.string(),
  name: z.string(),
  quantity: z.coerce.number(),
  image: z.string().optional().default(""),
  attributes: z.array(z.string()).nullable().optional(),
  values: z.array(z.string()).nullable().optional(),
});

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
  message: z.string().optional().default(""),
  products: z.array(budgetProductSchema),
});

export type BudgetFormSchema = z.infer<typeof budgetFormSchema>;
export type BudgetProduct = z.infer<typeof budgetProductSchema>;

export type BudgetFormState = {
  success?: boolean;
  message?: string;
  data?: {
    name: string;
    email: string;
    phone: string;
    message: string;
    products: BudgetProduct[];
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
