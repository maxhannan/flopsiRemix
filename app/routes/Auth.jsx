import { Container } from "@mui/material";
import { Box } from "@mui/system";
import { Outlet } from "@remix-run/react";

const AuthLayout = () => {
  return (
    <Box>
      <Container
        maxWidth="xl"
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          paddingX: "0",
          height: "100vh",
        }}
      >
        <Outlet />
      </Container>
    </Box>
  );
};

export default AuthLayout;
