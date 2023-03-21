import { Box, Button, MenuItem, Select, TextField } from "@mui/material";
import { Stack } from "@mui/system";
import { useState } from "react";
import AllergensSelect from "./AllergensSelect";
import IngredientSection from "./IngredientSection";
import RecipeStepSection from "./RecipeStepSection";

const RecipeForm = ({ recipe }) => {
  const [recipeValues, setRecipeValues] = useState(
    recipe || {
      name: "",
      category: "All Recipes",
      allergens: [],
      yield: { yieldQty: "", yieldUnit: "" },
      ingredients: [{ ingredient: "", qty: "", unit: "" }],
      steps: [""],
    }
  );

  const handleChange = (change, field) => {
    setRecipeValues({ ...recipeValues, [field]: change });
  };

  return (
    <Stack spacing={2}>
      <TextField
        label="Recipe Name"
        name="recipeName"
        defaultValue={recipeValues.name}
        required
        fullWidth
      />
      <Select
        color="secondary"
        value={recipeValues.category}
        onChange={(e) => handleChange(e.target.value, "category")}
        labelId="category"
        id="category"
        name="category"
      >
        <MenuItem value={"All Recipes"}>All Recipes</MenuItem>
        <MenuItem value={"Breads/Crackers/Wraps"}>
          Breads/Crackers/Wraps
        </MenuItem>
        <MenuItem value={"Spreads"}>Spreads</MenuItem>
        <MenuItem value={"Raw & Cured"}>Raw & Cured</MenuItem>
        <MenuItem value={"Land & Sea"}>Land & Sea</MenuItem>
        <MenuItem value={"Vegetables"}>Vegetables</MenuItem>
        <MenuItem value={"Spice Mix"}>Spice Mix</MenuItem>
        <MenuItem value={"Dairy"}>Dairy</MenuItem>
        <MenuItem value={"Pasta Dough"}>Pasta Dough</MenuItem>
      </Select>
      <Box sx={{ display: "flex" }}>
        <TextField
          sx={{ flex: "2", mr: "1rem" }}
          label="Yield Quantity"
          name="yieldQty"
          defaultValue={recipeValues.yield.yieldQty}
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
      <AllergensSelect />
      <IngredientSection ingredientsList={recipeValues.ingredients} />
      <RecipeStepSection stepsList={recipeValues.steps} />
      <Button
        type="submit"
        variant="contained"
        disableElevation
        color="secondary"
      >
        Save
      </Button>
    </Stack>
  );
};

export default RecipeForm;
