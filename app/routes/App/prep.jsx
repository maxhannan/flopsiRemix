import { useNavigation } from "@remix-run/react";
import LoadingComponent from "../../Components/LoadingComponent";

import { Typography } from "@mui/material";

import { Box } from "@mui/system";
const Prep = () => {
  const navigation = useNavigation();

  if (navigation.state === "loading") {
    return <LoadingComponent />;
  }

  return (
    <Box>
      <Typography variant="h5">Prep</Typography>
    </Box>
  );
};

export default Prep;
