import { CircularProgress, Fab, Fade, Stack, Zoom } from "@mui/material";
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

import { getUser } from "../../../utils/auth.server";
import { redirect } from "@remix-run/node";
import BottomNav from "../../../Components/Navigation/BottomNav";
import NavBar from "../../../Components/Navigation/NavBar";
import { Container } from "@mui/system";

const filterAndCategorize = (recipes, category, search) => {
  const categorizedRecipes =
    category === "All Recipes" || category === null
      ? recipes
      : recipes.filter((r) => r.category === category);

  const recipeList =
    search === null
      ? categorizedRecipes
      : categorizedRecipes.filter((r) =>
          r.name.toLowerCase().includes(search.toLowerCase())
        );

  return recipeList;
};

export const loader = async ({ request }) => {
  const recipes = await getRecipes();
  const url = new URL(request.url);
  const params = new URLSearchParams(url.search);

  const recipeList = filterAndCategorize(
    recipes,
    params.get("category"),
    params.get("search")
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
  const [searchParams, setSearchParams] = useSearchParams();

  const navigation = useNavigation();
  const [search, setSearch] = useState(searchParams.get("search") || "");
  const [category, setCategory] = useState(
    searchParams.get("category") || "All Recipes"
  );

  const pageChangeLoading =
    navigation.state === "loading" &&
    !navigation.location.pathname.includes("/app/recipes");
  return (
    <Fade appear in mountOnEnter unmountOnExit timeout={{ enter: 500 }}>
      <Stack spacing={1} sx={{ paddingTop: "4.5rem", paddingBottom: "7em" }}>
        <NavBar />
        {!pageChangeLoading && (
          <SearchAndFilter
            search={search}
            searchParams={searchParams}
            setSearchParams={setSearchParams}
            setSearch={setSearch}
            categories={categories}
            category={category}
            setCategory={setCategory}
          />
        )}
        {navigation.state === "loading" ? (
          <Container
            sx={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            <CircularProgress />
          </Container>
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
