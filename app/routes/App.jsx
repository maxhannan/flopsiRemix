import { Box, Container, createTheme, ThemeProvider } from "@mui/material";
import { blue, green, grey, purple } from "@mui/material/colors";
import { useLocation, useOutlet } from "@remix-run/react";
import { AnimatePresence, motion } from "framer-motion";

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
  const outlet = useOutlet();
  const location = useLocation();
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
            paddingTop: "5em",
            paddingBottom: "7em",
            paddingX: "0",
          }}
        >
          <AnimatePresence>
            <motion.main key={location.pathname}>{outlet}</motion.main>
          </AnimatePresence>

          <BottomNav />
        </Container>
      </Box>
    </AddRecipeContextProvider>
  );
};

export default App;
