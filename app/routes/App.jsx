import { Box, Container } from "@mui/material";
import { grey } from "@mui/material/colors";
import { Outlet, useLocation, useOutlet } from "@remix-run/react";
import { AnimatePresence, motion } from "framer-motion";

import BottomNav from "../Components/Navigation/BottomNav";
import NavBar from "../Components/Navigation/NavBar";
import { AddRecipeContextProvider } from "../Context/RecipeAdderCtx";
import { getUser, requireUserId } from "../utils/auth.server";

import { useColorMode } from "../utils/themeCtx";

export const loader = async ({ request, params }) => {
  await requireUserId(request);
  const user = await getUser(request);

  return user;
};

const App = () => {
  const [colorM, _] = useColorMode();

  const darkManifest = {
    short_name: "Flopsi",
    name: "Flopsi",
    scope: "/",
    icons: [
      {
        src: "splash_screens/icon.png",
        type: "image/png",
        sizes: "512x512",
      },
    ],
    display: "standalone",
    theme_color: grey[900],
    background_color: grey[900],
  };
  const lightManifest = {
    short_name: "Flopsi",
    name: "Flopsi",
    scope: "/",
    icons: [
      {
        src: "splash_screens/icon.png",
        type: "image/png",
        sizes: "512x512",
      },
    ],
    display: "standalone",
    theme_color: "#ffffff",
    background_color: "#ffffff",
  };
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
