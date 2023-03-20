import { Button, Divider, Typography } from "@mui/material";
import { Box, Stack } from "@mui/system";
import { useState } from "react";
import { MdAdd } from "react-icons/md";
import IngredientAdder from "./IngredinetAdder";
import { v4 } from "uuid";

const IngredientsSection = () => {
  const [ingredients, setIngredients] = useState([
    {
      name: "",
      linkedRecipe: null,
      qty: "",
      unit: "",
      orderNum: "",
      id: v4(),
    },
  ]);
  const addIngredient = () => {
    const newIngredient = {
      name: "",
      linkedRecipe: null,
      qty: "",
      unit: "",
      orderNum: "",

      id: v4(),
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
          <Box>
            <Button
              variant="outlined"
              disableElevation
              startIcon={<MdAdd />}
              color="secondary"
              onClick={addIngredient}
            >
              Add
            </Button>
          </Box>
        </Box>
        <Divider />
      </Stack>
      <Stack spacing={2}>
        {ingredients.map((i) => {
          return (
            <IngredientAdder
              key={i.id}
              id={i.id}
              ingredient={i}
              handleDelete={handleDelete}
            />
          );
        })}
      </Stack>
    </>
  );
};

export default IngredientsSection;
