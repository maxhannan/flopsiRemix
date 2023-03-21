import {
  Autocomplete,
  Button,
  Divider,
  Icon,
  IconButton,
  TextField,
} from "@mui/material";
import { Box, Stack } from "@mui/system";
import { useState } from "react";
import { MdClose, MdDelete } from "react-icons/md";

import top100Films from "./FAKELIST";
const IngredientAdder = ({ id, handleDelete, ingredientObj }) => {
  const [updatedIngredient, setUpdatedIngredient] = useState(ingredientObj);

  return (
    <Stack spacing={2}>
      <Box sx={{ display: "flex" }}>
        <TextField
          multiline
          sx={{ flex: "3", mr: ".5em" }}
          label="Ingredient Name"
          value={updatedIngredient.ingredient}
          name="ingredient"
          required
          onChange={(e) =>
            setUpdatedIngredient({
              ...updatedIngredient,
              ingredient: e.target.value,
            })
          }
        />

        <IconButton
          onClick={() => handleDelete(id)}
          variant="outlined"
          size="small"
          color="secondary"
        >
          <MdClose size={"1.25rem"} />
        </IconButton>
      </Box>
      <Box sx={{ display: "flex" }}>
        <TextField
          sx={{ flex: "1", mr: ".5em" }}
          label="Qty"
          name="qty"
          required
          value={updatedIngredient.qty}
          onChange={(e) =>
            setUpdatedIngredient({ ...updatedIngredient, qty: e.target.value })
          }
        />
        <TextField
          sx={{ flex: "1", mr: ".5em" }}
          label="Unit"
          name="unit"
          required
          value={updatedIngredient.unit}
          onChange={(e) =>
            setUpdatedIngredient({ ...updatedIngredient, unit: e.target.value })
          }
        />
        <Autocomplete
          disablePortal
          id="combo-box-demo"
          sx={{ flex: "2" }}
          options={top100Films}
          onChange={(e) => console.log(e)}
          renderInput={(params) => (
            <TextField {...params} label="Link to recipe..." />
          )}
        />
      </Box>
      <Divider />
    </Stack>
  );
};

export default IngredientAdder;
