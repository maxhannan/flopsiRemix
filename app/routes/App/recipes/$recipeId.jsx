import {
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
} from "@remix-run/react";
import { useEffect, useRef, useState } from "react";
import { MdClose, MdOutlineEditNote } from "react-icons/md";

import FullScreenDialog from "../../../Components/Menus/FullScreenDialog";
import ScaleFormDialog from "../../../Components/Menus/ScaleDialog";

import NewIngredientTable from "../../../Components/RecipeAdder/IngredientTable";
import RecipeForm from "../../../Components/RecipeAdder/RecipeForm";
import RecipeInstructions from "../../../Components/RecipeInstructions";

import { getRecipeById, getRecipes } from "../../../utils/recipes.server";
import LoadingComponent from "../../../Components/LoadingComponent";

export const loader = async ({ params }) => {
  const recipe = await getRecipeById(params.recipeId);
  const recipeList = await getRecipes();

  return { recipe, recipeList };
};

export function meta() {
  return {
    // <meta name="description" content="Welcome to the web!" />
    "apple-mobile-web-app-capable": "yes",
    // <meta name="theme-color" content="#f22" />
    "apple-mobile-web-app-status-bar-style": "default",
  };
}
const Recipe = () => {
  const lastMessage = useRef({});
  const navigate = useNavigate();
  const data = useLoaderData() || lastMessage.current;
  const location = useLocation();
  const { recipe, recipeList } = data;
  const filteredList = recipeList.filter((r) => r.id !== recipe.id);
  const navigation = useNavigation();
  const action = `/app/editrecipe/${recipe.id}`;
  const [open, setOpen] = useState(false);
  const [scale, setScale] = useState(1);

  useEffect(() => {
    if (navigation.state === "submitting") {
      setOpen(!open);
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
      initial={{ opacity: 0, y: 100 }}
      animate={{ opacity: 1, y: 0 }}
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
          <Form action={action} method="post">
            <RecipeForm recipe={recipe} recipeList={filteredList} />
          </Form>
        </Container>
      </FullScreenDialog>
    </motion.div>
  );
};

export default Recipe;
