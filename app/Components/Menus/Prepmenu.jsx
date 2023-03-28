import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Divider from "@mui/material/Divider";
import {
  ListItemIcon,
  ListItemText,
  MenuList,
  Paper,
  Typography,
} from "@mui/material";

import { useState } from "react";
import { MdDelete, MdEdit, MdKeyboardArrowDown, MdPages } from "react-icons/md";
import { Link, useNavigate } from "@remix-run/react";
import { Box } from "@mui/system";

export default function PrepMenu() {
  const [anchorEl, setAnchorEl] = useState(null);
  const navigate = useNavigate();
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <Button
        id="demo-customized-button"
        aria-controls={open ? "demo-customized-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        variant="outlined"
        disableElevation
        sx={{ maxHeight: "3rem", minHeight: "3rem" }}
        onClick={handleClick}
        endIcon={<MdKeyboardArrowDown />}
      >
        Prep Lists
      </Button>
      <Menu
        elevation={0}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        <Paper
          variant="outlined"
          sx={{
            width: 470,
            maxWidth: "100%",
          }}
        >
          <MenuList>
            <MenuItem>
              <ListItemIcon>
                <MdPages />
              </ListItemIcon>
              <ListItemText>Create New Prep List</ListItemText>
              <Typography variant="body2" color="text.secondary"></Typography>
            </MenuItem>

            <MenuItem
              component={Link}
              to="/app/prep/templatecreator"
              onClick={() => setAnchorEl(null)}
            >
              <ListItemIcon>
                <MdEdit />
              </ListItemIcon>

              <ListItemText>Build New List Template</ListItemText>
            </MenuItem>

            <Divider />
            <MenuItem>
              <ListItemIcon>
                <MdDelete />
              </ListItemIcon>
              <ListItemText>Delete Templates</ListItemText>
            </MenuItem>
          </MenuList>
        </Paper>
      </Menu>
    </div>
  );
}
