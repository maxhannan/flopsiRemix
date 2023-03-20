import {
  Button,
  FormControlLabel,
  MenuItem,
  Select,
  Switch,
  TextField,
} from "@mui/material";
import { Container, Stack } from "@mui/system";
import { Form, useNavigation } from "@remix-run/react";
import { useContext, useEffect, useState } from "react";
import AddRecipeContext from "../../Context/RecipeAdderCtx";

import IngredientSection from "./IngredientSection";

import RecipeStepSection from "./RecipeStepSection";

const RecipeAdder = () => {
  const navigation = useNavigation();
  const { handleCloseDialog } = useContext(AddRecipeContext);
  const [selectValue, setSelectValue] = useState("All Recipes");
  useEffect(() => {
    if (navigation.state === "submitting") {
      handleCloseDialog();
    }
  }, [navigation]);
  return (
    <Container sx={{ my: "2rem" }} disableGutters>
      <Form action="/app/submitrecipe" method="post">
        <Stack spacing={2}>
          <TextField label="Recipe Name" name="recipeName" required fullWidth />
          <Select
            color="secondary"
            value={selectValue}
            onChange={(e) => setSelectValue(e.target.value)}
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
          <IngredientSection />
          <RecipeStepSection />
          <Button
            type="submit"
            variant="contained"
            disableElevation
            color="secondary"
          >
            Save
          </Button>
        </Stack>
      </Form>
    </Container>
  );
};

export default RecipeAdder;
