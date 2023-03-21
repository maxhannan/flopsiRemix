import { Container } from "@mui/system";
import { Form, useNavigation } from "@remix-run/react";
import { useContext, useEffect } from "react";
import AddRecipeContext from "../../Context/RecipeAdderCtx";
import RecipeForm from "./RecipeForm";

const RecipeAdder = () => {
  const navigation = useNavigation();
  const { handleCloseDialog } = useContext(AddRecipeContext);

  useEffect(() => {
    if (navigation.state === "submitting") {
      handleCloseDialog();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [navigation]);

  return (
    <Container sx={{ my: "2rem" }} disableGutters>
      <Form action="/app/submitrecipe" method="post">
        <RecipeForm />
      </Form>
    </Container>
  );
};

export default RecipeAdder;
