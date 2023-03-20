import { redirect } from "@remix-run/node";

export const action = async ({ request }) => {
  const data = await request.formData();

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
    ingredients: ingredients,
    steps: data.getAll("step"),
  };

  console.log(newRecipe);

  return newRecipe;
};
export const loader = async () => redirect("/app/recipes");
