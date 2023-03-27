import { Container, Divider, Typography } from "@mui/material";
import { useNavigation } from "@remix-run/react";
import LoadingComponent from "../../../Components/LoadingComponent";
import TemplateForm from "../../../Components/Prep/TemplateForm";

const TemplateCreator = () => {
  const navigation = useNavigation();

  if (navigation.state === "loading") {
    return <LoadingComponent />;
  }
  return (
    <Container>
      <Typography variant="h5" color="secondary">
        Template Creator
      </Typography>

      <TemplateForm />
    </Container>
  );
};

export default TemplateCreator;
