import { Container } from "@mui/system";
import { Outlet } from "@remix-run/react";

const Prep = () => {
  return (
    <Container sx={{ mt: "4.5rem", mb: "10rem" }}>
      <Outlet />
    </Container>
  );
};

export default Prep;
