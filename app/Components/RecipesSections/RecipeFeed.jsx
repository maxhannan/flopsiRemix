import { Typography } from "@mui/material";
import { Stack } from "@mui/system";
import RecipeSummary from "./Components/RecipeSummary";

const RecipeFeed = ({ recipes, search, category }) => {
  const filterAndCategorize = (search, category) => {
    const categorizedRecipes =
      category === "All Recipes"
        ? recipes
        : recipes.filter((r) => r.category === category);
    const filteredRecipes = categorizedRecipes.filter((r) =>
      r.name.toLowerCase().includes(search.toLowerCase())
    );
    return filteredRecipes;
  };

  const recipeList = filterAndCategorize(search, category);

  return (
    <Stack sx={{ mt: 2 }} spacing={1}>
      {recipeList.length > 0 ? (
        recipeList.map((r) => <RecipeSummary key={r.id} recipe={r} />)
      ) : (
        <Typography>No results found</Typography>
      )}
    </Stack>
  );
};

export default RecipeFeed;
