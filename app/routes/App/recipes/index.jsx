import { Fab, Fade, Stack, Zoom } from "@mui/material";
import { useLoaderData, useNavigation } from "@remix-run/react";
import { useContext, useEffect, useState } from "react";
import { MdAdd } from "react-icons/md";

import FullScreenDialog from "../../../Components/Menus/FullScreenDialog";
import RecipeAdder from "../../../Components/RecipeAdder/RecipeAdder";
import SearchAndFilter from "../../../Components/RecipesSections/Components/SearchAndFilter";
import RecipeFeed from "../../../Components/RecipesSections/RecipeFeed";
import AddRecipeContext from "../../../Context/RecipeAdderCtx";
import {
  createRecipe,
  extractRecipe,
  getRecipes,
} from "../../../utils/recipes.server";
import LoadingComponent from "../../../Components/LoadingComponent";

import { getUser } from "../../../utils/auth.server";
import { redirect } from "@remix-run/node";
import BottomNav from "../../../Components/Navigation/BottomNav";
import NavBar from "../../../Components/Navigation/NavBar";

export const loader = async () => {
  const recipes = await getRecipes();
  return recipes;
};

export const action = async ({ request }) => {
  const user = await getUser(request);
  const data = await request.formData();
  const newRecipe = extractRecipe(data);
  const savedRecipe = await createRecipe(newRecipe, user.id);

  return redirect(`/app/recipes/${savedRecipe.id}`);
};
const RecipeIndex = () => {
  const { open, handleClickOpen, handleCloseDialog } =
    useContext(AddRecipeContext);

  const recipes = useLoaderData();
  const categories =
    recipes &&
    [...new Set(recipes.map((item) => item.category))].filter(
      (r) => r !== "All Recipes"
    );
  const navigation = useNavigation();
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All Recipes");

  if (navigation.state === "loading") {
    return <LoadingComponent />;
  }

  return (
    <Fade appear in mountOnEnter unmountOnExit timeout={{ enter: 500 }}>
      <Stack spacing={1} sx={{ paddingTop: "4.5rem", paddingBottom: "7em" }}>
        <NavBar />
        <SearchAndFilter
          search={search}
          setSearch={setSearch}
          categories={categories}
          category={category}
          setCategory={setCategory}
        />

        {recipes && (
          <RecipeFeed recipes={recipes} search={search} category={category} />
        )}

        <Zoom
          appear
          in
          mountOnEnter
          unmountOnExit
          style={{ transitionDelay: "500ms" }}
        >
          <Fab
            sx={{ position: "fixed", bottom: "6.5rem", right: ".5rem" }}
            size="large"
            color="secondary"
            onClick={handleClickOpen}
          >
            <MdAdd size="2rem" />
          </Fab>
        </Zoom>
        <FullScreenDialog
          title={"Add Recipe"}
          open={open}
          handleClickOpen={handleClickOpen}
          handleClose={handleCloseDialog}
        >
          <RecipeAdder recipeList={recipes} />
        </FullScreenDialog>
        <BottomNav />
      </Stack>
    </Fade>
  );
};

export default RecipeIndex;
