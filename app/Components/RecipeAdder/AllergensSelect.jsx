import * as React from "react";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Chip from "@mui/material/Chip";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
    },
  },
};

const Allergens = [
  "Gluten",
  "Not Vegetarian",
  "Not Vegan",
  "Dairy",
  "Eggs",
  "Fish",
  "Shellfish",
  "Tree nuts",
  "Peanuts",
  "Soy",
  "Not Halal",
  "Not Kosher",
];

function getStyles(name, personName, theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

export default function AllergensSelect({ allergenList }) {
  console.log(allergenList);
  const theme = useTheme();
  const [personName, setPersonName] = React.useState(
    allergenList[0] ? allergenList : []
  );

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setPersonName(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };

  return (
    <div>
      <FormControl fullWidth>
        <InputLabel id="allergens">Allergens</InputLabel>
        <Select
          labelId="allergens"
          id="allergens"
          name="allergens"
          multiple
          fullWidth
          value={personName}
          onChange={handleChange}
          input={<OutlinedInput id="select-multiple-chip" label="Allergens" />}
          renderValue={(selected) => (
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
              {selected.map((value) => (
                <Chip color="error" key={value} label={value} />
              ))}
            </Box>
          )}
          MenuProps={MenuProps}
        >
          {Allergens.map((a) => (
            <MenuItem
              key={a}
              value={a}
              style={getStyles(name, personName, theme)}
            >
              {a}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}
