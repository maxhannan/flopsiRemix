import {
  CircularProgress,
  Container,
  Divider,
  Grid,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import { useLoaderData } from "@remix-run/react";
import { useState } from "react";
import { MdClose, MdOutlineEditNote } from "react-icons/md";
import { TbScaleOutline } from "react-icons/tb";
import { Form, useNavigate, useNavigation } from "react-router-dom";

import FullScreenDialog from "../../../Components/Menus/FullScreenDialog";
import ScaleFormDialog from "../../../Components/Menus/ScaleDialog";
import FormDialog from "../../../Components/Menus/ScaleDialog";
import NewIngredientTable from "../../../Components/RecipeAdder/IngredientTable";
import IngredientTable from "../../../Components/RecipeAdder/IngredientTable";
import RecipeForm from "../../../Components/RecipeAdder/RecipeForm";
import RecipeInstructions from "../../../Components/RecipeInstructions";

import { getRecipeById } from "../../../utils/recipes.server";

export const loader = async ({ params }) => {
  console.log(params);
  const recipe = await getRecipeById(params.recipeId);
  console.log(recipe);
  return recipe;
};

const Recipe = () => {
  const navigate = useNavigate();
  const recipe = useLoaderData();

  const [open, setOpen] = useState(false);

  const [scale, setScale] = useState(1);

  const navigation = useNavigation();

  if (navigation.state === "loading" || !recipe) {
    return <CircularProgress />;
  }

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
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
          <IconButton onClick={() => navigate("/app/recipes")}>
            <MdClose />
          </IconButton>
        </Box>
      </Box>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={12} md={12}>
          <NewIngredientTable rows={recipe.ingredients} scale={scale} />
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
            <RecipeForm recipe={recipe} />
          </Form>
        </Container>
      </FullScreenDialog>
    </>
  );
};

export default Recipe;
