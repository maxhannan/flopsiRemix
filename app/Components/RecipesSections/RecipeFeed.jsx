import { Stack } from "@mui/system";

import { v4 as uuidv4 } from "uuid";

import RecipeSummary from "./Components/RecipeSummary";

const RecipeFeed = ({ recipes }) => {
  return (
    <Stack sx={{ mt: 2 }} spacing={1}>
      {recipes.map((r) => (
        <RecipeSummary key={r.id} recipe={r} />
      ))}
    </Stack>
  );
};

export default RecipeFeed;
