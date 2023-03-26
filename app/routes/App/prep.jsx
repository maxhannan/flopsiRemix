import { useLocation, useNavigation } from "@remix-run/react";
import LoadingComponent from "../../Components/LoadingComponent";
import { motion } from "framer-motion";
import { Typography } from "@mui/material";
const Prep = () => {
  const navigation = useNavigation();
  const location = useLocation();
  if (navigation.state === "loading") {
    return <LoadingComponent />;
  }

  return (
    <motion.div
      key={location.pathname}
      initial={{ opacity: 0, y: -100 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <Typography variant="h5">Prep</Typography>
    </motion.div>
  );
};

export default Prep;
