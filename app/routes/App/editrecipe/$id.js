import { redirect } from "@remix-run/node";
import { extractRecipe, updateRecipe } from "../../../utils/recipes.server";

export const action = async ({ request, params }) => {
  const data = await request.formData();
  const newRecipe = extractRecipe(data);
  const savedRecipe = await updateRecipe(newRecipe, params.id);

  return redirect(`/app/recipes/${savedRecipe.id}`);
};
export const loader = async () => redirect("/app/recipes");
