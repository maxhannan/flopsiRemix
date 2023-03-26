import { Box, Container } from "@mui/material";
import { Outlet } from "@remix-run/react";

import BottomNav from "../Components/Navigation/BottomNav";
import NavBar from "../Components/Navigation/NavBar";
import { AddRecipeContextProvider } from "../Context/RecipeAdderCtx";
import { getUser, requireUserId } from "../utils/auth.server";

export const loader = async ({ request, params }) => {
  await requireUserId(request);
  const user = await getUser(request);

  return user;
};

const App = () => {
  return (
    <AddRecipeContextProvider>
      <Box
        sx={{
          m: "0",
          w: "100%",
        }}
      >
        <NavBar />
        <Container
          maxWidth="md"
          sx={{
            paddingTop: "4.5rem",
            paddingBottom: "7em",
            paddingX: "0",
          }}
        >
          <Outlet />

          <BottomNav />
        </Container>
      </Box>
    </AddRecipeContextProvider>
  );
};

export default App;
