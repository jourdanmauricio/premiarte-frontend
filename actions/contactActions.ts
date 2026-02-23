"use server";

import { z } from "zod";
import {
  contactFormSchema,
  type ContactFormState,
} from "@/validations/contact";

export const contactAction = async (
  prevState: ContactFormState,
  formData: FormData,
): Promise<ContactFormState> => {
  const fields = {
    name: (formData.get("name") ?? "") as string,
    email: (formData.get("email") ?? "") as string,
    phone: (formData.get("phone") ?? "") as string,
    message: (formData.get("message") ?? "") as string,
  };

  const validatedFields = contactFormSchema.safeParse(fields);

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
  };

  try {
    const response = await fetch(`${process.env.API_URL}/contacts`, {
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
        message: "Error al enviar el mensaje",
        zodErrors: null,
        formError: "Error al enviar el mensaje",
        data: fields,
      };
    }

    return {
      success: true,
      message: "¡Mensaje enviado exitosamente!",
      zodErrors: null,
      formError: null,
      data: fields,
    };
  } catch (error) {
    console.error("Error al enviar el mensaje:", error);
    return {
      success: false,
      message: "Error al enviar el mensaje",
      zodErrors: null,
      formError: "Error al enviar el mensaje",
      data: fields,
    };
  }
};
