import { Slide, Typography } from "@mui/material";
import { Stack } from "@mui/system";
import RecipeSummary from "./Components/RecipeSummary";
const filterAndCategorize = (category, recipes) => {
  const categorizedRecipes =
    category === "All Recipes" || category === null
      ? recipes
      : recipes.filter((r) => r.category === category);
  console.log("categorized", categorizedRecipes.length);

  return categorizedRecipes;
};
const RecipeFeed = ({ recipes, category }) => {
  const recipeList = filterAndCategorize(category, recipes);
  return (
    <Slide
      direction="up"
      appear
      in
      mountOnEnter
      unmountOnExit
      timeout={{ enter: 400 }}
    >
      <Stack spacing={1}>
        {recipeList.length > 0 ? (
          recipeList.map((r) => <RecipeSummary key={r.id} recipe={r} />)
        ) : (
          <Typography>No results found</Typography>
        )}
      </Stack>
    </Slide>
  );
};

export default RecipeFeed;
