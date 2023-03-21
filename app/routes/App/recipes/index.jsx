import { CircularProgress, Fab } from "@mui/material";
import { useLoaderData } from "@remix-run/react";
import { useContext, useState } from "react";
import { MdAdd } from "react-icons/md";
import { useNavigation } from "react-router";
import FullScreenDialog from "../../../Components/Menus/FullScreenDialog";
import RecipeAdder from "../../../Components/RecipeAdder/RecipeAdder";
import SearchAndFilter from "../../../Components/RecipesSections/Components/SearchAndFilter";
import RecipeFeed from "../../../Components/RecipesSections/RecipeFeed";
import AddRecipeContext from "../../../Context/RecipeAdderCtx";
import { getRecipes } from "../../../utils/recipes.server";

export const loader = async () => {
  const recipes = await getRecipes();
  return recipes;
};
const RecipeIndex = () => {
  const { open, handleClickOpen, handleCloseDialog } =
    useContext(AddRecipeContext);

  const recipes = useLoaderData();
  const navigation = useNavigation();
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All Recipes");
  if (navigation.state === "loading") {
    return <CircularProgress />;
  }

  return (
    <>
      <SearchAndFilter
        search={search}
        setSearch={setSearch}
        category={category}
        setCategory={setCategory}
      />
      {recipes && (
        <RecipeFeed recipes={recipes} search={search} category={category} />
      )}

      <Fab
        sx={{ position: "fixed", bottom: "6.5rem", right: ".5rem" }}
        size="large"
        color="secondary"
        onClick={handleClickOpen}
      >
        <MdAdd size="2rem" />
      </Fab>

      <FullScreenDialog
        title={"Add Recipe"}
        open={open}
        handleClickOpen={handleClickOpen}
        handleClose={handleCloseDialog}
      >
        <RecipeAdder />
      </FullScreenDialog>
    </>
  );
};

export default RecipeIndex;
