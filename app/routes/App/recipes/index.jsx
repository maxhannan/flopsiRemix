import { Fab, Fade, Stack, Zoom } from "@mui/material";
import {
  useLoaderData,
  useNavigation,
  useSearchParams,
} from "@remix-run/react";
import { useContext, useState } from "react";
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

const filterAndCategorize = (category, recipes) => {
  const categorizedRecipes =
    category === "All Recipes" || category === null
      ? recipes
      : recipes.filter((r) => r.category === category);
  console.log("categorized", categorizedRecipes.length);

  return categorizedRecipes;
};

export const loader = async ({ request }) => {
  const recipes = await getRecipes();
  const url = new URL(request.url);
  const params = new URLSearchParams(url.search);
  const recipeList =
    params.get("search") === null
      ? recipes
      : recipes.filter((r) =>
          r.name.toLowerCase().includes(params.get("search").toLowerCase())
        );

  const categories =
    recipes &&
    [...new Set(recipes.map((item) => item.category))].filter(
      (r) => r !== "All Recipes"
    );
  return { recipes, recipeList, categories };
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

  const { recipes, recipeList, categories } = useLoaderData();
  const [searchParams, setSearchParams] = useSearchParams({
    search: "",
    category: "All Recipes",
  });

  const navigation = useNavigation();
  const [search, setSearch] = useState(searchParams.get("search") || "");
  const [category, setCategory] = useState("All Recipes");

  const loading =
    navigation.state === "loading" &&
    !navigation.location.pathname.includes("/app/recipes");
  return (
    <Fade appear in mountOnEnter unmountOnExit timeout={{ enter: 500 }}>
      <Stack spacing={1} sx={{ paddingTop: "4.5rem", paddingBottom: "7em" }}>
        <NavBar />
        {!loading && (
          <SearchAndFilter
            search={search}
            seatrchParams={searchParams}
            setSearchParams={setSearchParams}
            setSearch={setSearch}
            categories={categories}
            category={category}
            setCategory={setCategory}
          />
        )}
        {navigation.state === "loading" ? (
          <LoadingComponent />
        ) : (
          <RecipeFeed
            recipes={recipeList}
            search={search}
            category={category}
          />
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
