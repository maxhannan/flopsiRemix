import { redirect } from "@remix-run/node";
import { getUser } from "../../utils/auth.server";
import { createRecipe, updateRecipe } from "../../utils/recipes.server";

export const loader = async () => redirect("/app/recipes");
