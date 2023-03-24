import { redirect } from "@remix-run/node";
import { deleteRecipe } from "../../../utils/recipes.server";

export const action = async ({ request, params }) => {
  await deleteRecipe(params.id);
  return redirect("/app/recipes");
};
export const loader = async () => redirect("/app/recipes");
