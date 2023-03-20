import { Fab, Typography } from "@mui/material";
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

  return (
    <>
      <SearchAndFilter />
      <RecipeFeed itemNum={25} />
      <Fab
        sx={{ position: "fixed", bottom: "7rem", right: ".25rem" }}
        size="large"
        variant="extended"
        color="secondary"
        onClick={handleClickOpen}
      >
        <MdAdd size="1.5rem" />
        <Typography variant="subtitle2" sx={{ ml: ".5rem" }}>
          Add recipe
        </Typography>
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
