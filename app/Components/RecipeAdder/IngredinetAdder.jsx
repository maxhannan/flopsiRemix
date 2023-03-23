import { Autocomplete, Divider, IconButton, TextField } from "@mui/material";
import { Box, Stack } from "@mui/system";
import { useState } from "react";
import { MdClose } from "react-icons/md";

const IngredientAdder = ({
  id,
  handleDelete,
  ingredientObj,
  recipeList,
  handleChange,
}) => {
  const options = recipeList.map((r) => ({ label: r.name, id: r.id }));
  const optionFound = options.filter((o) => o.id === ingredientObj.linkId);

  const [linkRecipeValue, setLinkRecipeValue] = useState(
    optionFound.length > 0 ? optionFound[0] : null
  );

  const handleChangeLink = async (nv) => {
    setLinkRecipeValue(nv);
    handleChange(id, "ingredient", nv ? nv.label : "");
  };

  const handleInput = (e) => {
    console.log(setLinkRecipeValue.label, e.target.value);
    if (setLinkRecipeValue.label !== e.target.value) {
      handleChange(id, "ingredient", e.target.value);
      setLinkRecipeValue(null);
      return;
    }
    handleChange(id, "ingredient", e.target.value);
  };

  return (
    <Stack spacing={2}>
      <Box sx={{ display: "flex" }}>
        <TextField
          multiline
          sx={{ flex: "3", mr: ".5em" }}
          label="Ingredient Name"
          color={linkRecipeValue && "success"}
          focused={linkRecipeValue ? true : false}
          value={ingredientObj.ingredient}
          name="ingredient"
          required
          onChange={(e) => handleInput(e)}
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
          value={linkRecipeValue ? linkRecipeValue.id : ""}
        />
        <Autocomplete
          disablePortal
          isOptionEqualToValue={(option, value) => option.id === value.id}
          id="combo-box-demo"
          sx={{ flex: "2" }}
          name="linkRecipeBox"
          options={options}
          value={linkRecipeValue}
          onChange={(e, nv) => {
            handleChangeLink(nv);
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              value={linkRecipeValue}
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
