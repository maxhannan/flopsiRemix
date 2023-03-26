import { useLoaderData, useNavigation } from "@remix-run/react";
import LoadingComponent from "../../Components/LoadingComponent";

import {
  AppBar,
  Button,
  Container,
  SpeedDial,
  SpeedDialAction,
  SpeedDialIcon,
  Stack,
} from "@mui/material";

import { Box } from "@mui/system";

import { MdCopyAll, MdPrint, MdSave, MdShare } from "react-icons/md";
import PrepMenu from "../../Components/Menus/Prepmenu";
import { getRecipes } from "../../utils/recipes.server";
import RecipeFeed from "../../Components/RecipesSections/RecipeFeed";
const actions = [
  { icon: <MdCopyAll size="1.5em" />, name: "Copy" },
  { icon: <MdSave size="1.5em" />, name: "Save" },
  { icon: <MdPrint size="1.5em" />, name: "Print" },
  { icon: <MdShare size="1.5em" />, name: "Share" },
];

export const loader = async () => {
  const recipes = await getRecipes();
  return recipes;
};

const Prep = () => {
  const navigation = useNavigation();

  const recipes = useLoaderData();

  if (navigation.state === "loading") {
    return <LoadingComponent />;
  }

  return (
    <Container sx={{ mt: "4.5rem", mb: "10rem" }}>
      <Stack spacing={2}>
        <Box
          sx={{ display: "flex", justifyContent: "flex-start", width: "100%" }}
        >
          <PrepMenu />
        </Box>
        {recipes && (
          <RecipeFeed recipes={recipes} search={""} category={"All Recipes"} />
        )}
      </Stack>
    </Container>
  );
};

export default Prep;
