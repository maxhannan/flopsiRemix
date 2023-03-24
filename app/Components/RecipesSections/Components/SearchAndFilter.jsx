import { Box, FormControl, MenuItem, Select, TextField } from "@mui/material";

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
    <Box display="flex">
      <TextField
        fullWidth
        color="secondary"
        label="Search Recipes"
        value={search}
        onChange={handleSearchChange}
        sx={{ width: "65%" }}
      />
      <FormControl sx={{ width: "34%", marginLeft: "auto" }}>
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
    </Box>
  );
};

export default SearchAndFilter;
