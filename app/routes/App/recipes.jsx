import { Container } from "@mui/material";
import { Outlet, useNavigation } from "@remix-run/react";
import LoadingComponent from "../../Components/LoadingComponent";

const Recipes = () => {
  const navigation = useNavigation();
  return (
    <Container>
      {navigation.state === "loading" && <LoadingComponent />}
      <Outlet />
    </Container>
  );
};

export default Recipes;
