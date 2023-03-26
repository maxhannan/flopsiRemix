import { styled, alpha, useTheme } from "@mui/material/styles";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Divider from "@mui/material/Divider";

import { useState } from "react";
import {
  MdArchive,
  MdContentCut,
  MdDelete,
  MdEdit,
  MdFileCopy,
  MdKeyboardArrowDown,
  MdList,
  MdMoreHoriz,
  MdPages,
} from "react-icons/md";
import {
  ListItemIcon,
  ListItemText,
  MenuList,
  Paper,
  Typography,
} from "@mui/material";

const StyledMenu = styled((props) => (
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
    {...props}
  />
))(({ theme }) => ({
  "& .MuiPaper-root": {
    borderRadius: 6,
    marginTop: theme.spacing(1),
    minWidth: 180,
    color:
      theme.palette.mode === "light"
        ? "rgb(55, 65, 81)"
        : theme.palette.grey[300],
    boxShadow:
      "rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px",
    "& .MuiMenu-list": {
      padding: "4px 0",
    },
    "& .MuiMenuItem-root": {
      "& .MuiSvgIcon-root": {
        fontSize: 18,
        color: theme.palette.text.secondary,
        marginRight: "40px",
      },
      "&:active": {
        backgroundColor: alpha(
          theme.palette.primary.main,
          theme.palette.action.selectedOpacity
        ),
      },
    },
  },
}));

export default function PrepMenu() {
  const theme = useTheme();
  const [anchorEl, setAnchorEl] = useState(null);
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
            <MenuItem>
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
