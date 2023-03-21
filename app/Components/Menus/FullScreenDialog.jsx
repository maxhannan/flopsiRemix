import Dialog from "@mui/material/Dialog";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";

import Slide from "@mui/material/Slide";
import { MdClose } from "react-icons/md";
import { Container } from "@mui/system";
import { forwardRef } from "react";

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function FullScreenDialog({
  title,
  open,
  handleClose,
  children,
}) {
  return (
    <div>
      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <AppBar color="secondary" elevation={0} sx={{ position: "relative" }}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <MdClose />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              {title}
            </Typography>
          </Toolbar>
        </AppBar>
        <Container>{children}</Container>
      </Dialog>
    </div>
  );
}
