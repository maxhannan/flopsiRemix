import { Box, Button, TextField } from "@mui/material";
import { Stack } from "@mui/system";
import { useNavigation } from "@remix-run/react";

import AllergensSelect from "./AllergensSelect";
import CategorySelect from "./CategorySelect";
import IngredientSection from "./IngredientSection";
import RecipeStepSection from "./RecipeStepSection";

const RecipeForm = ({ recipe, recipeList, filteredList }) => {
  const navigation = useNavigation();
  console.log(recipe, recipeList);
  const categories = [
    ...new Set(recipeList.map((item) => item.category)),
  ].filter((r) => r !== "All Recipes");

  const findCategory =
    recipe && categories.filter((c) => c === recipe.category);
  const initValue =
    findCategory && findCategory.length > 0 ? findCategory : ["All Recipes"];

  categories.unshift("All Recipes");
  const testOptions = categories.map((c) => ({ title: c }));

  const recipeValues = recipe || {
    name: "",
    category: "All Recipes",
    allergens: [],
    yield: { yieldQty: "", yieldUnit: "" },
    ingredients: [{ ingredient: "", qty: "", unit: "" }],
    steps: [""],
  };

  const btnText = recipe ? "Update" : "Save";

  return (
    <Stack spacing={2}>
      <TextField
        label="Recipe Name"
        name="recipeName"
        defaultValue={recipeValues.name}
        required
        fullWidth
      />

      <CategorySelect
        initValue={{ title: initValue[0] }}
        categories={testOptions}
      />
      <Box sx={{ display: "flex" }}>
        <TextField
          sx={{ flex: "1", mr: "1rem" }}
          label="Yield Quantity"
          name="yieldQty"
          type="number"
          defaultValue={recipeValues.yield.yieldQty}
          inputProps={{ inputMode: "numeric" }}
          required
          fullWidth
        />
        <TextField
          label="Yield Unit"
          sx={{ flex: "1" }}
          name="yieldUnit"
          defaultValue={recipeValues.yield.yieldUnit}
          required
          fullWidth
        />
      </Box>
      <AllergensSelect allergenList={recipeValues.allergens} />
      <IngredientSection
        ingredientsList={recipeValues.ingredients}
        recipeList={filteredList || recipeList}
      />
      <RecipeStepSection stepsList={recipeValues.steps} />
      <Button
        type="submit"
        variant="contained"
        disableElevation
        color="secondary"
        name="_action"
        value="update"
      >
        {navigation.state === "submitting" ? "Submitting..." : btnText}
      </Button>
    </Stack>
  );
};

export default RecipeForm;
