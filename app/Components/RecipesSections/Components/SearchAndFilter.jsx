import {
  Box,
  FormControl,
  MenuItem,
  Select,
  Slide,
  Stack,
  TextField,
} from "@mui/material";

const SearchAndFilter = ({
  setSearch,
  search,
  setCategory,
  category,
  categories,
}) => {
  const handleChange = (event) => {
    setCategory(event.target.value);
  };

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  return (
    <Slide direction="down" appear in mountOnEnter unmountOnExit>
      <Stack spacing={1}>
        <TextField
          fullWidth
          color="secondary"
          label="Search Recipes"
          value={search}
          onChange={handleSearchChange}
        />
        <FormControl>
          <Select
            color="secondary"
            labelId="select"
            id="select"
            value={category}
            displayEmpty
            onChange={handleChange}
          >
            <MenuItem key={"All Recipes"} value={"All Recipes"}>
              All Recipes
            </MenuItem>
            {categories &&
              categories.map((c) => (
                <MenuItem key={c} value={c}>
                  {c}
                </MenuItem>
              ))}
          </Select>
        </FormControl>
      </Stack>
    </Slide>
  );
};

export default SearchAndFilter;
