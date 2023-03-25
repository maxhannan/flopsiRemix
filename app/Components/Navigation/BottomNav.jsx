import { GiForkKnifeSpoon } from "react-icons/gi";
import { RiFileList3Line } from "react-icons/ri";
import { TbMath } from "react-icons/tb";
import { BottomNavigation, BottomNavigationAction, Paper } from "@mui/material";

import { useEffect, useState } from "react";
import { purple } from "@mui/material/colors";
import { styled } from "@mui/material/styles";
import { useLocation, Link } from "@remix-run/react";

const NavBtn = styled(BottomNavigationAction)(`
  &.Mui-selected {
    color: ${purple[400]};
  }
`);

const BottomNav = () => {
  const location = useLocation();

  const [value, setValue] = useState(location.pathname.split("/")[2]);

  useEffect(() => {
    setValue(location.pathname.split("/")[2]);
  }, [location]);

  const handleClick = (path) => {
    setValue(path);
  };

  return (
    <Paper
      elevation={2}
      sx={{ position: "fixed", bottom: 0, left: 0, right: 0, width: "100vw" }}
    >
      <BottomNavigation
        value={value}
        sx={{ borderTop: 1, borderColor: "#c2c2c2", height: "6rem" }}
      >
        <NavBtn
          label="Prep"
          value="prep"
          component={Link}
          to="/app/prep"
          onClick={() => handleClick("prep")}
          icon={<RiFileList3Line size="2rem" />}
        />
        <NavBtn
          label="Recipes"
          value="recipes"
          component={Link}
          to="/app/recipes"
          onClick={() => handleClick("recipes")}
          icon={<GiForkKnifeSpoon size="2rem" />}
        />
        <NavBtn
          label="Convert"
          value="convert"
          component={Link}
          to="/app/convert"
          onClick={() => handleClick("convert")}
          icon={<TbMath size="2rem" />}
        />
      </BottomNavigation>
    </Paper>
  );
};

export default BottomNav;
