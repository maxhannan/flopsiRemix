import { Box, FormControl, MenuItem, Select, TextField } from "@mui/material";

const SearchAndFilter = ({ setSearch, search, setCategory, category }) => {
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
          <MenuItem value={"All Recipes"}>All Recipes</MenuItem>
          <MenuItem value={"Breads/Crackers/Wraps"}>
            Breads/Crackers/Wraps
          </MenuItem>
          <MenuItem value={"Spreads"}>Spreads</MenuItem>
          <MenuItem value={"Raw & Cured"}>Raw & Cured</MenuItem>
          <MenuItem value={"Land & Sea"}>Land & Sea</MenuItem>
          <MenuItem value={"Vegetables"}>Vegetables</MenuItem>
          <MenuItem value={"Spice Mix"}>Spice Mix</MenuItem>
          <MenuItem value={"Dairy"}>Dairy</MenuItem>
          <MenuItem value={"Pasta Dough"}>Pasta Dough</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
};

export default SearchAndFilter;
