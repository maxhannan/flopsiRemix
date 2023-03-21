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
  try {
    const recipes = await prisma.recipe.findMany({
      select: {
        id: true,
        name: true,
        category: true,
        author: {
          select: {
            id: true,
            username: true,
            chef: true,
            profile: true,
          },
        },
      },
    });
    return recipes;
  } catch (error) {
    return null;
  }
};

export const getRecipeById = async (recipeId) => {
  const recipe = await prisma.recipe.findUnique({
    where: { id: recipeId },
    include: {
      author: {
        select: {
          id: true,
          username: true,
          chef: true,
          profile: true,
        },
      },
    },
  });

  return recipe;
};

export const updateRecipe = async (recipe, recipeId) => {
  const updatedRecipe = await prisma.recipe.update({
    where: {
      id: recipeId,
    },
    data: {
      ...recipe,
    },
  });
  return updatedRecipe;
};
