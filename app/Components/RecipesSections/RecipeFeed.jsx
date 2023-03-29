import { Slide, Typography } from "@mui/material";
import { Stack } from "@mui/system";
import RecipeSummary from "./Components/RecipeSummary";

const RecipeFeed = ({ recipes }) => {
  const recipeList = recipes;
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
