import { subscribeAction } from "./subscribeAction";
import { budgetAction } from "./budgetActions";

export const actions = {
  subscribe: { subscribeAction },
  budget: { budgetAction },
};
