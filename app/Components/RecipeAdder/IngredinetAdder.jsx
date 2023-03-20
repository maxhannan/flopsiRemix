import {
  Autocomplete,
  Button,
  Icon,
  IconButton,
  TextField,
} from "@mui/material";
import { Box, Stack } from "@mui/system";
import { useState } from "react";
import { MdDelete } from "react-icons/md";

import top100Films from "./FAKELIST";
const IngredientAdder = ({ id, handleDelete, ingredient }) => {
  const [updatedIngredient, setUpdatedIngredient] = useState(ingredient);

  return (
    <Stack spacing={2}>
      <Box sx={{ display: "flex" }}>
        <TextField
          multiline
          sx={{ flex: "3", mr: ".5em" }}
          label="Ingredient Name"
          value={updatedIngredient.name}
          name="ingredient"
          required
          onChange={(e) =>
            setUpdatedIngredient({
              ...updatedIngredient,
              name: e.target.value,
            })
          }
        />

        <IconButton
          onClick={() => handleDelete(id)}
          sx={{ width: "50px" }}
          variant="outlined"
          color="secondary"
        >
          <MdDelete />
        </IconButton>
      </Box>
      <Box sx={{ display: "flex" }}>
        <Autocomplete
          disablePortal
          id="combo-box-demo"
          sx={{ flex: "3", mr: ".5em" }}
          options={top100Films}
          onChange={(e) => console.log(e)}
          renderInput={(params) => (
            <TextField {...params} label="Link to recipe..." />
          )}
        />
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
          sx={{ flex: "1" }}
          label="Unit"
          name="unit"
          required
          value={updatedIngredient.unit}
          onChange={(e) =>
            setUpdatedIngredient({ ...updatedIngredient, unit: e.target.value })
          }
        />
      </Box>
    </Stack>
  );
};

export default IngredientAdder;
