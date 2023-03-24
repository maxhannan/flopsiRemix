import TextField from "@mui/material/TextField";
import Autocomplete, { createFilterOptions } from "@mui/material/Autocomplete";
import { useState } from "react";

const filter = createFilterOptions();

export default function CategorySelect({ categories, initValue }) {
  const [value, setValue] = useState(initValue || null);

  const handleChange = (event, newValue) => {
    if (typeof newValue === "string") {
      setValue({
        title: newValue,
      });
    } else if (newValue && newValue.inputValue) {
      // Create a new value from the user input
      setValue({
        title: newValue.inputValue,
      });
    } else {
      setValue(newValue);
    }
  };

  return (
    <>
      <TextField
        sx={{ display: "none" }}
        label="linkBox"
        name="freeSolo"
        value={value ? value.title : ""}
      />
      <Autocomplete
        fullWidth
        value={value}
        onChange={(event, newValue) => handleChange(event, newValue)}
        filterOptions={(options, params) => {
          const filtered = filter(options, params);

          const { inputValue } = params;
          // Suggest the creation of a new value
          const isExisting = options.some(
            (option) => inputValue === option.title
          );
          if (inputValue !== "" && !isExisting) {
            filtered.push({
              inputValue,
              title: `Add "${inputValue}"`,
            });
          }

          return filtered;
        }}
        selectOnFocus
        clearOnBlur
        handleHomeEndKeys
        id="free-solo-with-text-demo"
        name="free-solo"
        options={categories}
        getOptionLabel={(option) => {
          // Value selected with enter, right from the input
          if (typeof option === "string") {
            return option;
          }
          // Add "xxx" option created dynamically
          if (option.inputValue) {
            return option.inputValue;
          }
          // Regular option
          return option.title;
        }}
        renderOption={(props, option) => <li {...props}>{option.title}</li>}
        freeSolo
        renderInput={(params) => <TextField {...params} label="Category" />}
      />
    </>
  );
}
