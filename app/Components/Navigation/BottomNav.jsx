import { GiForkKnifeSpoon } from "react-icons/gi";
import { RiFileList3Line } from "react-icons/ri";
import { TbMath } from "react-icons/tb";
import { BottomNavigation, BottomNavigationAction, Paper } from "@mui/material";

import { useState } from "react";

import { useTheme } from "@mui/material/styles";
import { useLocation, useNavigate } from "@remix-run/react";

const BottomNav = () => {
  const location = useLocation();
  const theme = useTheme();
  const navigate = useNavigate();
  const [value, setValue] = useState(location.pathname.split("/")[2]);

  const handleClick = (path) => {
    navigate(`/app/${path}`);
    setValue(path);
  };

  return (
    <Paper
      elevation={2}
      sx={{ position: "fixed", bottom: 0, left: 0, right: 0, width: "100vw" }}
    >
      <BottomNavigation
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
        sx={{
          borderTop: 1,
          borderColor: "#c2c2c2",
          height: "6rem",
          bgcolor: theme.palette.background.default,
        }}
      >
        <BottomNavigationAction
          label="Prep"
          color="secondary"
          value="prep"
          onClick={() => handleClick("prep")}
          icon={<RiFileList3Line size="2rem" />}
        />
        <BottomNavigationAction
          label="Recipes"
          value="recipes"
          onClick={() => handleClick("recipes")}
          icon={<GiForkKnifeSpoon size="2rem" />}
        />
        <BottomNavigationAction
          label="Convert"
          value="convert"
          onClick={() => handleClick("convert")}
          icon={<TbMath size="2rem" />}
        />
      </BottomNavigation>
    </Paper>
  );
};

export default BottomNav;
