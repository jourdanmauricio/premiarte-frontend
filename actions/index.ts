import { subscribeAction } from "./subscribeAction";
import { budgetAction } from "./budgetActions";
import { contactAction } from "./contactActions";

export const actions = {
  subscribe: { subscribeAction },
  budget: { budgetAction },
  contact: { contactAction },
};
