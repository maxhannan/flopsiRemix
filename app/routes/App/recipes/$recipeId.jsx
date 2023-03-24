import {
  Button,
  Chip,
  Container,
  Grid,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import { motion } from "framer-motion";

import { Box } from "@mui/system";
import {
  useLoaderData,
  Form,
  useNavigate,
  useNavigation,
  useLocation,
  Link,
  useSubmit,
} from "@remix-run/react";
import { useEffect, useRef, useState } from "react";
import { MdClose, MdOutlineEditNote } from "react-icons/md";

import FullScreenDialog from "../../../Components/Menus/FullScreenDialog";
import ScaleFormDialog from "../../../Components/Menus/ScaleDialog";

import NewIngredientTable from "../../../Components/RecipeAdder/IngredientTable";
import RecipeForm from "../../../Components/RecipeAdder/RecipeForm";
import RecipeInstructions from "../../../Components/RecipeInstructions";

import {
  deleteRecipe,
  extractRecipe,
  getRecipeById,
  getRecipes,
  updateRecipe,
} from "../../../utils/recipes.server";
import LoadingComponent from "../../../Components/LoadingComponent";
import { getUser } from "../../../utils/auth.server";
import { json, redirect } from "@remix-run/node";

export const loader = async ({ request, params }) => {
  const recipe = await getRecipeById(params.recipeId);
  const recipeList = await getRecipes();
  const user = await getUser(request);
  return { recipe, recipeList, user };
};

export function meta() {
  return {
    // <meta name="description" content="Welcome to the web!" />
    "apple-mobile-web-app-capable": "yes",
    // <meta name="theme-color" content="#f22" />
    "apple-mobile-web-app-status-bar-style": "default",
  };
}

export const ErrorBoundary = () => {
  return (
    <>
      <Box>Sorry no recipe found</Box>
      <Link to="/app/recipes">Go back to Recipe Page</Link>
    </>
  );
};

export const action = async ({ request, params }) => {
  const data = await request.formData();

  const action = data.get("_action");
  console.log(action, "AC");
  switch (action) {
    case "update":
      const newRecipe = extractRecipe(data);
      const savedRecipe = await updateRecipe(newRecipe, params.recipeId);

      return redirect(`/app/recipes/${savedRecipe.id}`);
    case "delete":
      console.log("ISIDE");
      await deleteRecipe(params.recipeId);
      return redirect("/app/recipes");
    default:
      return json({ error: `Invalid Form Data` }, { status: 400 });
  }
};

const Recipe = () => {
  const lastMessage = useRef({});
  const navigate = useNavigate();
  const data = useLoaderData() || lastMessage.current;
  const location = useLocation();
  const { recipe, recipeList, user } = data;
  const filteredList = recipeList.filter((r) => r.id !== recipe.id);
  const navigation = useNavigation();
  const action = `/app/editrecipe/${recipe.id}`;
  const [open, setOpen] = useState(false);
  const [scale, setScale] = useState(1);
  const submit = useSubmit();
  useEffect(() => {
    if (navigation.state === "submitting") {
      setOpen(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [navigation]);

  useEffect(() => {
    if (data) lastMessage.current = data;
  }, [data]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  if (navigation.state === "loading") {
    return <LoadingComponent />;
  }
  return (
    <motion.div
      key={location.pathname}
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.25 }}
    >
      <Box sx={{ display: "flex", mb: ".25rem" }}>
        <Box sx={{ flexGrow: 1 }}>
          <Stack spacing={0}>
            <Typography variant="overline">
              {recipe.author.profile.firstName +
                " " +
                recipe.author.profile.lastName}
            </Typography>
            <Typography variant="h5">{recipe.name}</Typography>
            <Typography color="secondary" variant="overline">
              {recipe.category}
            </Typography>
            <Typography variant="overline">
              Yields:{" "}
              {recipe.yield.yieldQty * scale + " " + recipe.yield.yieldUnit}
            </Typography>
          </Stack>
        </Box>

        <Box>
          <ScaleFormDialog scale={scale} setScale={setScale} />
        </Box>

        <Box>
          <IconButton onClick={() => setOpen(true)}>
            <MdOutlineEditNote />
          </IconButton>
        </Box>
        <Box>
          <IconButton onClick={() => navigate(-1)}>
            <MdClose />
          </IconButton>
        </Box>
      </Box>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={12} md={12}>
          <NewIngredientTable rows={recipe.ingredients} scale={scale} />
          <Box>
            {recipe.allergens[0] &&
              recipe.allergens.map((a) => (
                <Chip
                  sx={{ mr: ".25rem", mt: "1rem" }}
                  color="error"
                  key={a}
                  label={a}
                />
              ))}
          </Box>
        </Grid>
        <RecipeInstructions instructions={recipe.steps} />
      </Grid>

      <FullScreenDialog
        title={"Edit Recipe"}
        open={open}
        handleClickOpen={handleClickOpen}
        handleClose={handleClose}
      >
        <Container sx={{ my: "2rem" }} disableGutters>
          <Form method="post">
            <RecipeForm
              recipe={recipe}
              filteredList={filteredList}
              recipeList={recipeList}
            />
            {recipe.author.username === user.username && (
              <Box>
                <Button
                  color="error"
                  fullWidth
                  name="_action"
                  value="delete"
                  sx={{ mt: "1em" }}
                  variant="outlined"
                  type="submit"
                >
                  Delete Recipe?
                </Button>
              </Box>
            )}
          </Form>
        </Container>
      </FullScreenDialog>
    </motion.div>
  );
};

export default Recipe;
