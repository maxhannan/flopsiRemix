import { redirect } from "@remix-run/node";
import { getUser } from "../../utils/auth.server";
import { createRecipe, extractRecipe } from "../../utils/recipes.server";

export const action = async ({ request }) => {
  const user = await getUser(request);
  const data = await request.formData();
  const newRecipe = extractRecipe(data);
  const savedRecipe = await createRecipe(newRecipe, user.id);

  return redirect(`/app/recipes/${savedRecipe.id}`);
};
export const loader = async () => redirect("/app/recipes");
