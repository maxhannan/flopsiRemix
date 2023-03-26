import { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";

import { MdDarkMode, MdLightMode, MdLogout } from "react-icons/md";
import { Button, IconButton } from "@mui/material";
import { GiCook } from "react-icons/gi";
import PopMenu from "../Menus/PopMenu";

import { Form, useNavigate } from "@remix-run/react";
import { useColorMode } from "../../utils/themeCtx";

const NavBar = () => {
  const navigate = useNavigate();
  const [theme, setTheme] = useColorMode();

  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleThemeChange = () => {
    if (theme === "light") {
      setTheme("dark");
    } else {
      setTheme("light");
    }
  };
  return (
    <AppBar
      position="fixed"
      elevation={0}
      sx={{
        bgcolor: "background.default",
        borderBottom: 1,
        borderColor: "#c2c2c2",
      }}
    >
      <Toolbar
        sx={{ dsiplay: "flex", width: "100%", justifyContent: "flex-end" }}
      >
        <Form action="/auth/logout" method="post">
          <IconButton
            variant="outlined"
            size="large"
            color="secondary"
            onClick={handleThemeChange}
          >
            {theme === "light" ? <MdDarkMode /> : <MdLightMode />}
          </IconButton>
          <IconButton
            variant="outlined"
            size="large"
            color="secondary"
            onClick={handleMenu}
          >
            <GiCook />
          </IconButton>
          <PopMenu
            anchorEl={anchorEl}
            handleClose={handleClose}
            items={[
              {
                name: "View Profile",
                cb: () => navigate("/app/profile"),
              },
              {
                name: "Theme",
                cb: handleThemeChange,
              },
            ]}
          />

          <IconButton
            variant="outlined"
            size="large"
            color="secondary"
            type="submit"
          >
            <MdLogout />
          </IconButton>
        </Form>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
