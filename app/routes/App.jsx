import { Box, Container } from "@mui/material";
import { Outlet } from "@remix-run/react";
import BottomNav from "../Components/Navigation/BottomNav";
import NavBar from "../Components/Navigation/NavBar";

const App = () => {
  return (
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
  );
};

export default App;
