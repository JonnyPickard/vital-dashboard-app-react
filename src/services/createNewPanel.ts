import type { NewPanelFormValues } from "../components/NewPanel";

// Placeholder for now as there's no existing api route
export const createNewPanel = async (data: NewPanelFormValues) => {
  console.log("submitted successfully:", JSON.stringify(data));

  return Promise.resolve(data);
};
