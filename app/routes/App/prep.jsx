import {
  Form,
  useActionData,
  useLoaderData,
  useNavigation,
  useSubmit,
  useSearchParams,
} from "@remix-run/react";
import LoadingComponent from "../../Components/LoadingComponent";

import {
  AppBar,
  Button,
  Container,
  Fade,
  Stack,
  TextField,
} from "@mui/material";

import { Box } from "@mui/system";

import PrepMenu from "../../Components/Menus/Prepmenu";
import { getRecipes } from "../../utils/recipes.server";
import RecipeFeed from "../../Components/RecipesSections/RecipeFeed";
import { LocalizationProvider, MobileDatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { useEffect, useState } from "react";

export const loader = async ({ request }) => {
  const url = new URL(request.url);
  const search = new URLSearchParams(url.search);
  console.log(search.get("date"));
  const date = dayjs(search.get("date"));
  const recipes = await getRecipes();

  if (search.get("date") !== null) {
    const recipeList = recipes.filter((r) =>
      dayjs(r.createdAt).isSame(date, "d")
    );
    console.log(recipeList);
    return recipeList;
  } else {
    const recipeList = recipes.filter((r) =>
      dayjs(r.createdAt).isSame(dayjs(), "d")
    );
    console.log(recipeList);
    return recipeList;
  }
};

const Prep = () => {
  const navigation = useNavigation();

  const recipes = useLoaderData();
  console.log(recipes);
  const [searchParams, setSearchParams] = useSearchParams();

  const submit = useSubmit();
  const handleDateChange = (nv) => {
    setSearchParams({ date: nv.toISOString() });
    setDate(nv);
  };
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
              <Form method="get">
                <MobileDatePicker
                  value={date}
                  onChange={(newValue) => handleDateChange(newValue)}
                  slotProps={{
                    textField: {
                      sx: {
                        "& .MuiInputBase-input": {
                          height: ".95rem",
                          maxWidth: "10rem",
                        },
                      },
                    },
                  }}
                />
              </Form>
            </Box>
            {recipes && (
              <RecipeFeed recipes={recipes} search="" category="All Recipes" />
            )}
          </Stack>
        </Container>
      </Fade>
    </LocalizationProvider>
  );
};

export default Prep;
