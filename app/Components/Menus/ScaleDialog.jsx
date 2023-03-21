import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useState } from "react";
import { IconButton } from "@mui/material";
import { TbScaleOutline } from "react-icons/tb";

export default function ScaleFormDialog({ scale, setScale }) {
  const [modalOpen, setmodalOpen] = useState(false);
  const [value, setValue] = useState(scale);
  const handleModalOpen = () => {
    setmodalOpen(true);
  };

  const handleModalClose = () => {
    setmodalOpen(false);
  };

  const handleModalSubmit = () => {
    setScale(value);
    handleModalClose();
  };
  return (
    <>
      <IconButton onClick={handleModalOpen}>
        <TbScaleOutline />
      </IconButton>
      <Dialog open={modalOpen} onClose={handleModalClose}>
        <DialogTitle>Scale Recipe</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Add a batch size to scale your recipe.
          </DialogContentText>
          <TextField
            sx={{ mt: "1em" }}
            color="secondary"
            autoFocus
            margin="dense"
            variant="outlined"
            id="scale"
            label="Batch Size"
            type="number"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button color="secondary" onClick={handleModalClose}>
            Cancel
          </Button>
          <Button color="secondary" onClick={handleModalSubmit}>
            Scale
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
