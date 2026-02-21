import { NextResponse } from "next/server";
import { budgetAction } from "@/actions/budgetActions";
import type { BudgetFormState } from "@/validations/budget";

const INITIAL_STATE: BudgetFormState = {
  success: false,
  message: undefined,
  zodErrors: null,
  formError: null,
  data: {
    name: "",
    email: "",
    phone: "",
    message: "",
    products: [],
  },
};

/**
 * POST /api/budget
 * Misma lógica que la Server Action de presupuesto, pero como ruta API estable
 * para evitar el error "Failed to find Server Action" en deploys (build ID mismatch).
 */
export async function POST(request: Request) {
  const formData = await request.formData();
  const state = await budgetAction(INITIAL_STATE, formData);
  return NextResponse.json(state);
}
