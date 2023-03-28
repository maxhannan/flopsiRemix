import {
  Form,
  useLoaderData,
  useNavigation,
  useSearchParams,
} from "@remix-run/react";
import LoadingComponent from "../../../Components/LoadingComponent";

import { Container, Fade, Stack } from "@mui/material";
import { Box } from "@mui/system";

import PrepMenu from "../../../Components/Menus/Prepmenu";
import { getRecipes } from "../../../utils/recipes.server";
import RecipeFeed from "../../../Components/RecipesSections/RecipeFeed";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { useState } from "react";
import PrepDatePicker from "../../../Components/Prep/DatePicker";

export const loader = async ({ request }) => {
  const url = new URL(request.url);
  const search = new URLSearchParams(url.search);

  const date = dayjs(search.get("date"));
  const recipes = await getRecipes();

  if (search.get("date") !== null) {
    const recipeList = recipes.filter((r) =>
      dayjs(r.createdAt).isSame(date, "d")
    );
    return recipeList;
  } else {
    const recipeList = recipes.filter((r) =>
      dayjs(r.createdAt).isSame(dayjs(), "d")
    );
    return recipeList;
  }
};

const PrepIndex = () => {
  const navigation = useNavigation();
  const recipes = useLoaderData();
  const [searchParams, setSearchParams] = useSearchParams();
  const dateParams = searchParams.get("date");
  const [date, setDate] = useState(
    dateParams !== null ? dayjs(dateParams) : dayjs()
  );

  const handleDateChange = (nv) => {
    setSearchParams({ date: nv.toISOString() });
    setDate(nv);
  };

  const loading =
    navigation.state === "loading" &&
    !navigation.location.pathname.includes("/app/prep");

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Fade appear in mountOnEnter unmountOnExit timeout={{ enter: 500 }}>
        <Stack spacing={2}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              width: "100%",
            }}
          >
            {!loading && (
              <>
                <PrepMenu />
                <Form method="get">
                  <PrepDatePicker
                    value={date}
                    handleChange={handleDateChange}
                  />
                </Form>
              </>
            )}
          </Box>
          {navigation.state === "loading" ? (
            <LoadingComponent />
          ) : (
            <RecipeFeed recipes={recipes} search="" category="All Recipes" />
          )}
        </Stack>
      </Fade>
    </LocalizationProvider>
  );
};

export default PrepIndex;
