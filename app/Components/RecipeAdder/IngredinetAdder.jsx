import { Autocomplete, Divider, IconButton, TextField } from "@mui/material";
import { Box, Stack } from "@mui/system";
import { useState } from "react";
import { MdClose } from "react-icons/md";
import { v4 } from "uuid";

const IngredientAdder = ({
  id,
  handleDelete,
  ingredientObj,
  recipeList,
  handleChange,
}) => {
  const [linkRecipeValue, setLinkRecipeValue] = useState("");
  const [ingredientValue, setIngredientValue] = useState(
    ingredientObj.ingredient
  );
  const [focused, setFocused] = useState(false);
  const options = recipeList.map((r) => ({ label: r.name, id: r.id }));
  console.log("OBJJ");
  const optionFound = options.filter((o) => o.id === ingredientObj.linkId);
  console.log(optionFound);
  const [linkRecipeValueTest, setLinkRecipeValueTest] = useState(
    optionFound.length > 0 ? optionFound[0] : null
  );

  const handleChangeLink = async (nv) => {
    setLinkRecipeValue(nv ? nv.id : "");
    setLinkRecipeValueTest(nv);
    setIngredientValue(nv ? nv.label : "");
  };

  return (
    <Stack spacing={2}>
      <Box sx={{ display: "flex" }}>
        <TextField
          multiline
          focused={ingredientValue.length > 0}
          sx={{ flex: "3", mr: ".5em" }}
          label="Ingredient Name"
          defaultValue={ingredientValue}
          name="ingredient"
          required
          onChange={(e) => handleChange(id, "ingredient", e.target.value)}
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
          type="number"
          inputProps={{ inputMode: "numeric" }}
          required
          value={ingredientObj.qty}
          onChange={(e) => handleChange(id, "qty", e.target.value)}
        />
        <TextField
          sx={{ flex: "1", mr: ".5em" }}
          label="Unit"
          name="unit"
          required
          value={ingredientObj.unit}
          onChange={(e) => handleChange(id, "unit", e.target.value)}
        />
        <TextField
          sx={{ display: "none" }}
          label="linkBox"
          name="linkBox"
          value={linkRecipeValue}
        />
        <Autocomplete
          disablePortal
          isOptionEqualToValue={(option, value) => option.id === value.id}
          id="combo-box-demo"
          sx={{ flex: "2" }}
          name="linkRecipeBox"
          options={options}
          value={linkRecipeValueTest}
          onChange={(e, nv) => {
            handleChangeLink(nv);
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              value={linkRecipeValueTest}
              label="Link to recipe..."
            />
          )}
        />
      </Box>
      <Divider />
    </Stack>
  );
};

export default IngredientAdder;
