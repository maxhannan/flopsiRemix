import { useLoaderData, useNavigation } from "@remix-run/react";
import LoadingComponent from "../../Components/LoadingComponent";

import {
  AppBar,
  Button,
  Container,
  Fade,
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
import {
  DatePicker,
  LocalizationProvider,
  MobileDatePicker,
} from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { useState } from "react";

export const loader = async () => {
  const recipes = await getRecipes();
  return recipes;
};

const Prep = () => {
  const navigation = useNavigation();

  const recipes = useLoaderData();

  const [date, setDate] = useState(dayjs());

  if (navigation.state === "loading") {
    return <LoadingComponent />;
  }

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Fade appear in mountOnEnter unmountOnExit timeout={{ enter: 500 }}>
        <Container sx={{ mt: "4.5rem", mb: "10rem" }}>
          <Stack spacing={2}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                width: "100%",
              }}
            >
              <PrepMenu />
              <MobileDatePicker
                value={date}
                onChange={(newValue) => setDate(newValue)}
              />
            </Box>
            {recipes && (
              <RecipeFeed
                recipes={recipes}
                search={""}
                category={"All Recipes"}
              />
            )}
          </Stack>
        </Container>
      </Fade>
    </LocalizationProvider>
  );
};

export default Prep;
