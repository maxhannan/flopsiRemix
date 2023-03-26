import { useLocation, useNavigation } from "@remix-run/react";
import LoadingComponent from "../../Components/LoadingComponent";
import { motion } from "framer-motion";
import { Typography } from "@mui/material";
import BottomNav from "../../Components/Navigation/BottomNav";
import { Box } from "@mui/system";
const Prep = () => {
  const navigation = useNavigation();
  const location = useLocation();
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
