import { useLocation, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";

import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";

import Button from "@mui/material/Button";
//import PopMenu from "./PopMenu";
import { MdAdd } from "react-icons/md";
import { IconButton } from "@mui/material";
import { GiCook } from "react-icons/gi";
import PopMenu from "../Menus/PopMenu";
import AddRecipeContext from "../../Context/RecipeAdderCtx";

const NavBar = () => {
  const navigate = useNavigate();
  const location = useLocation().pathname;
  const [anchorEl, setAnchorEl] = useState(null);
  const { handleClickOpen } = useContext(AddRecipeContext);
  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <AppBar
      position="fixed"
      elevation={0}
      sx={{ bgcolor: "#ffffff", borderBottom: 1, borderColor: "#c2c2c2" }}
    >
      <Toolbar>
        <Typography
          variant="h5"
          component="div"
          color="secondary"
          sx={{ flexGrow: 1 }}
        >
          Max Hannan
        </Typography>
        <div>
          {location === "/app/recipes" && (
            <Button
              variant="outlined"
              elevation="0"
              startIcon={<MdAdd />}
              onClick={handleClickOpen}
              color="secondary"
            >
              Add
            </Button>
          )}

          <IconButton
            variant="outlined"
            size="large"
            color="secondary"
            onClick={handleMenu}
            sx={{ ml: "1rem" }}
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
                name: "Logout",
                cb: () => console.log("logout"),
              },
            ]}
          />
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;