import { Button, Divider, Typography } from "@mui/material";
import { Box, Stack } from "@mui/system";
import { useState } from "react";
import { MdAdd } from "react-icons/md";
import { v4 } from "uuid";
import IngredientAdder from "./IngredinetAdder";

const IngredientsSection = ({ ingredientsList }) => {
  const [ingredients, setIngredients] = useState(
    ingredientsList || [
      {
        ingredient: "",
        linkedRecipe: null,
        qty: "",
        unit: "",
      },
    ]
  );
  const addIngredient = () => {
    const newIngredient = {
      ingredient: "",
      linkedRecipe: null,
      qty: "",
      unit: "",
    };
    setIngredients([...ingredients, newIngredient]);
    console.log(ingredients);
  };

  const handleDelete = (id) => {
    const newIngredients = ingredients.filter((i) => i.id !== id);
    setIngredients(newIngredients);
  };

  return (
    <>
      <Stack spacing={1}>
        <Box sx={{ display: "flex" }}>
          <Typography sx={{ flex: "1" }} variant="h5">
            Ingredients
          </Typography>
        </Box>
        <Divider />
      </Stack>
      <Stack spacing={2}>
        {ingredients.map((i) => {
          return (
            <IngredientAdder
              key={v4()}
              id={i.id}
              ingredientObj={i}
              handleDelete={handleDelete}
            />
          );
        })}
        <Box>
          <Button
            startIcon={<MdAdd />}
            color="secondary"
            onClick={addIngredient}
          >
            Add Ingredient
          </Button>
        </Box>
      </Stack>
    </>
  );
};

export default IngredientsSection;
