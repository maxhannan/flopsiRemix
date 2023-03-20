import { Box, Container } from "@mui/material";
import { Outlet } from "@remix-run/react";
import BottomNav from "../Components/Navigation/BottomNav";
import NavBar from "../Components/Navigation/NavBar";
import { AddRecipeContextProvider } from "../Context/RecipeAdderCtx";

const App = () => {
  return (
    <AddRecipeContextProvider>
      <Box>
        <NavBar />
        <Container
          maxWidth="xl"
          sx={{ paddingTop: "5em", paddingBottom: "7em", paddingX: "0" }}
        >
          <Outlet />
          <BottomNav />
        </Container>
      </Box>
    </AddRecipeContextProvider>
  );
};

export default App;
