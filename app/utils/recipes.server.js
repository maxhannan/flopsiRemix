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

export const deleteRecipe = async (id) => {
  await prisma.recipe.delete({ where: { id } });
};
export const getRecipes = async () => {
  try {
    const recipes = await prisma.recipe.findMany({
      orderBy: [
        {
          name: "asc",
        },
      ],
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

export const extractRecipe = (data) => {
  const allergens = data.get("allergens").split(",");
  const yu = data.get("yieldUnit");
  const yq = data.get("yieldQty");
  const iL = data.getAll("ingredient");
  const qL = data.getAll("qty");
  const uL = data.getAll("unit");
  const links = data.getAll("linkBox");
  const soloTest = data.get("freeSolo");
  const recipeNameStr = data.get("recipeName");
  const recipeName =
    recipeNameStr.charAt(0).toUpperCase() + recipeNameStr.slice(1);
  console.log("SOLO", soloTest);
  const linkedIngredients = iL.map((i) => {
    if (links[iL.indexOf(i)].length > 0) {
      return {
        ingredient: i,
        qty: qL[iL.indexOf(i)],
        unit: uL[iL.indexOf(i)],
        linkId: links[iL.indexOf(i)],
      };
    }
    return {
      ingredient: i,
      qty: qL[iL.indexOf(i)],
      unit: uL[iL.indexOf(i)],
      linkId: null,
    };
  });

  const newRecipe = {
    name: recipeName,
    category: soloTest,
    allergens: allergens,
    yield: { yieldQty: yq, yieldUnit: yu },
    ingredients: linkedIngredients,
    steps: data.getAll("step"),
  };

  return newRecipe;
};
