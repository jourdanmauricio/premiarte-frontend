"use server";

import { z } from "zod";
import {
  newsletterFormSchema,
  type NewsletterFormState,
} from "@/validations/subscribe";

export const subscribeAction = async (
  prevState: NewsletterFormState,
  formData: FormData,
): Promise<NewsletterFormState> => {
  const fields = {
    name: formData.get("name") as string,
    email: formData.get("email") as string,
  };

  const validatedFields = newsletterFormSchema.safeParse(fields);

  if (!validatedFields.success) {
    const flattenedErrors = z.flattenError(validatedFields.error);
    console.log("validation errors", flattenedErrors.fieldErrors);

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
  };

  try {
    const response = await fetch(`${process.env.API_URL}/subscribe`, {
      method: "POST",
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json",
      },
    });

    await response.json();

    if (!response.ok) {
      return {
        success: false,
        message: "Error al suscribirse",
        zodErrors: null,
        formError: "Error al suscribirse",
        data: fields,
      };
    }

    return {
      success: true,
      message: "¡Suscripción exitosa!",
      zodErrors: null,
      formError: null,
      data: fields,
    };
  } catch (error) {
    console.error("Error al suscribirse:", error);
    return {
      success: false,
      message: "Error al suscribirse",
      zodErrors: null,
      formError: "Error al suscribirse",
      data: fields,
    };
  }
};
