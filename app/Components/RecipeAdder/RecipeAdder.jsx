import { Box, Button, MenuItem, Select, TextField } from "@mui/material";
import { Container, Stack } from "@mui/system";
import { Form, useNavigation } from "@remix-run/react";
import { useContext, useEffect, useState } from "react";
import AddRecipeContext from "../../Context/RecipeAdderCtx";
import AllergensSelect from "./AllergensSelect";

import IngredientSection from "./IngredientSection";
import RecipeForm from "./RecipeForm";

import RecipeStepSection from "./RecipeStepSection";

const RecipeAdder = () => {
  const navigation = useNavigation();
  const { handleCloseDialog } = useContext(AddRecipeContext);
  const [selectValue, setSelectValue] = useState("All Recipes");
  useEffect(() => {
    if (navigation.state === "submitting") {
      handleCloseDialog();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [navigation]);

  return (
    <Container sx={{ my: "2rem" }} disableGutters>
      <Form action="/app/submitrecipe" method="post">
        <RecipeForm />
      </Form>
    </Container>
  );
};

export default RecipeAdder;
