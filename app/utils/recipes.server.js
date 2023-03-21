import { prisma } from "./prisma.server";

export const createRecipe = async (recipe, userId) => {
  const newRecipe = await prisma.recipe.create({
    data: {
      ...recipe,
      author: { connect: { id: userId } },
    },
  });
  return newRecipe;
};

export const getRecipes = async () => {
  const recipes = await prisma.recipe.findMany({
    select: {
      id: true,
      name: true,
      category: true,
    },
  });
  return recipes;
};

export const getRecipeById = async (recipeId) => {
  const recipe = await prisma.recipe.findUnique({
    where: { id: recipeId },
  });

  return recipe;
};
