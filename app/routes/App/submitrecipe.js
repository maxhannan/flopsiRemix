import { redirect } from "@remix-run/node";
import { getUser } from "../../utils/auth.server";
import { createRecipe } from "../../utils/recipes.server";

export const action = async ({ request }) => {
  const user = await getUser(request);
  const data = await request.formData();
  const allergens = data.get("allergens").split(",");
  const yu = data.get("yieldUnit");
  const yq = data.get("yieldQty");
  const iL = data.getAll("ingredient");
  const qL = data.getAll("qty");
  const uL = data.getAll("unit");

  const ingredients = iL.map((i) => {
    return {
      ingredient: i,
      qty: qL[iL.indexOf(i)],
      unit: uL[iL.indexOf(i)],
    };
  });

  const newRecipe = {
    name: data.get("recipeName"),
    category: data.get("category"),
    allergens: allergens,
    yield: { yieldQty: yq, yieldUnit: yu },
    ingredients: ingredients,
    steps: data.getAll("step"),
  };
  const savedRecipe = await createRecipe(newRecipe, user.id);
  console.log(savedRecipe);

  return redirect(`/app/recipes/${savedRecipe.id}`);
};
export const loader = async () => redirect("/app/recipes");
