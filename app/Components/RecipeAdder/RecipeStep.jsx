import {
  Card,
  CardActions,
  CardContent,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";

import { MdDelete, MdEdit, MdSave } from "react-icons/md";

const RecipeStep = ({ stepNum, id, handleDelete }) => {
  return (
    <Card variant="outlined">
      <CardContent sx={{ mb: "0", pb: "0" }}>
        <Typography gutterBottom variant="h6" color="secondary" component="div">
          Step {stepNum}
        </Typography>
        <TextField
          variant="outlined"
          label="Edit Method"
          name="step"
          fullWidth
          multiline
        />
      </CardContent>
      <CardActions>
        <IconButton
          onClick={() => handleDelete(id)}
          variant="outlined"
          size="medium"
          color="secondary"
        >
          <MdDelete />
        </IconButton>
      </CardActions>
    </Card>
  );
};

export default RecipeStep;
