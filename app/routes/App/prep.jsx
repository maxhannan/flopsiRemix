import { useNavigation } from "@remix-run/react";
import LoadingComponent from "../../Components/LoadingComponent";

import {
  AppBar,
  Button,
  Container,
  SpeedDial,
  SpeedDialAction,
  SpeedDialIcon,
  Toolbar,
  Typography,
} from "@mui/material";

import { Box } from "@mui/system";
import { grey } from "@mui/material/colors";
import { MdAdd, MdCopyAll, MdPrint, MdSave, MdShare } from "react-icons/md";
import PrepMenu from "../../Components/Menus/Prepmenu";
const actions = [
  { icon: <MdCopyAll size="1.5em" />, name: "Copy" },
  { icon: <MdSave size="1.5em" />, name: "Save" },
  { icon: <MdPrint size="1.5em" />, name: "Print" },
  { icon: <MdShare size="1.5em" />, name: "Share" },
];
const Prep = () => {
  const navigation = useNavigation();

  if (navigation.state === "loading") {
    return <LoadingComponent />;
  }

  return (
    <Container sx={{ mt: "4.5rem", py: "0" }}>
      <Box sx={{ display: "flex", justifyContent: "flex-end", width: "100%" }}>
        <PrepMenu />
      </Box>
      <SpeedDial
        ariaLabel="SpeedDial basic example"
        sx={{ position: "absolute", bottom: "6.5rem", right: ".5rem" }}
        icon={<SpeedDialIcon />}
        direction="up"
      >
        {actions.map((action) => (
          <SpeedDialAction
            key={action.name}
            icon={action.icon}
            tooltipTitle={action.name}
          />
        ))}
      </SpeedDial>
    </Container>
  );
};

export default Prep;
