import {
  CircularProgress,
  Divider,
  Grid,
  IconButton,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import { useLoaderData } from "@remix-run/react";
import { useState } from "react";
import { MdClose, MdOutlineEditNote } from "react-icons/md";
import { TbScaleOutline } from "react-icons/tb";
import { useNavigate, useNavigation } from "react-router-dom";

import FullScreenDialog from "../../../Components/Menus/FullScreenDialog";
import NewIngredientTable from "../../../Components/RecipeAdder/IngredientTable";
import IngredientTable from "../../../Components/RecipeAdder/IngredientTable";
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
          <Typography variant="h5">{recipe.name}</Typography>
          <Typography sx={{ mr: "auto" }} variant="overline">
            Ricky Flor
          </Typography>
          <Typography
            color="secondary"
            sx={{ padding: "1em" }}
            variant="overline"
          >
            {recipe.category}
          </Typography>
        </Box>

        <Box>
          <IconButton>
            <TbScaleOutline />
          </IconButton>
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
          <NewIngredientTable rows={recipe.ingredients} />
        </Grid>
        <RecipeInstructions instructions={recipe.steps} />
      </Grid>

      <FullScreenDialog
        title={"Edit Recipe"}
        open={open}
        handleClickOpen={handleClickOpen}
        handleClose={handleClose}
      >
        {" "}
      </FullScreenDialog>
    </>
  );
};

export default Recipe;
