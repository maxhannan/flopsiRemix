import { Fab, Typography, useMediaQuery } from "@mui/material";
import { useContext } from "react";
import { MdAdd } from "react-icons/md";
import { useActionData } from "react-router";
import FullScreenDialog from "../../../Components/Menus/FullScreenDialog";
import RecipeAdder from "../../../Components/RecipeAdder/RecipeAdder";
import SearchAndFilter from "../../../Components/RecipesSections/Components/SearchAndFilter";
import RecipeFeed from "../../../Components/RecipesSections/RecipeFeed";
import AddRecipeContext from "../../../Context/RecipeAdderCtx";

const RecipeIndex = () => {
  const { open, handleClickOpen, handleCloseDialog } =
    useContext(AddRecipeContext);
  const matches = useMediaQuery("(max-width:650px)");

  return (
    <>
      <SearchAndFilter />
      <RecipeFeed itemNum={25} />

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
