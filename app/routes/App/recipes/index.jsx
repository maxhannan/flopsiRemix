import { useContext } from "react";
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
      <RecipeFeed itemNum={5} />
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
