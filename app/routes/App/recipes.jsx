import { Container } from "@mui/material";
import { Outlet } from "@remix-run/react";

const Recipes = () => {
  return (
    <Container>
      <Outlet />
    </Container>
  );
};

export default Recipes;
