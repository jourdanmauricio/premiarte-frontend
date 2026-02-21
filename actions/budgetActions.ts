"use server";

import { z } from "zod";
import { budgetFormSchema, type BudgetFormState } from "@/validations/budget";

export const budgetAction = async (
  prevState: BudgetFormState,
  formData: FormData,
): Promise<BudgetFormState> => {
  const fields = {
    name: (formData.get("name") ?? "") as string,
    email: (formData.get("email") ?? "") as string,
    phone: (formData.get("phone") ?? "") as string,
    message: (formData.get("message") ?? "") as string,
    products: JSON.parse((formData.get("products") ?? "[]") as string),
  };

  console.log("fields", fields);

  const validatedFields = budgetFormSchema.safeParse(fields);

  if (!validatedFields.success) {
    const flattenedErrors = z.flattenError(validatedFields.error);

    return {
      success: false,
      message: "Validation errors",
      zodErrors: flattenedErrors.fieldErrors,
      formError: null,
      data: fields,
    };
  }

  const body = {
    name: validatedFields.data.name,
    email: validatedFields.data.email,
    phone: validatedFields.data.phone,
    message: validatedFields.data.message,
    products: validatedFields.data.products,
  };

  try {
    const response = await fetch(`${process.env.API_URL}/budgets`, {
      method: "POST",
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json",
      },
    });

    console.log("response", response);

    await response.json();

    if (!response.ok) {
      return {
        success: false,
        message: "Error al solicitar presupuesto",
        zodErrors: null,
        formError: "Error al solicitar presupuesto",
        data: fields,
      };
    }

    return {
      success: true,
      message: "¡Presupuesto solicitado exitosamente!",
      zodErrors: null,
      formError: null,
      data: fields,
    };
  } catch (error) {
    console.error("Error al solicitar presupuesto:", error);
    return {
      success: false,
      message: "Error al solicitar presupuesto",
      zodErrors: null,
      formError: "Error al solicitar presupuesto",
      data: fields,
    };
  }
};
