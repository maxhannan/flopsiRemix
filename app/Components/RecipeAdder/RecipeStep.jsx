import {
  Card,
  CardActions,
  CardContent,
  Divider,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";

import { MdDelete } from "react-icons/md";

const RecipeStep = ({ step, handleDelete, handleChange }) => {
  return (
    <Card elevation={0}>
      <CardContent sx={{ mb: "0", pb: "0" }}>
        <Typography gutterBottom variant="h6" color="secondary" component="div">
          Step {step.orderNum}
        </Typography>
        <TextField
          variant="outlined"
          label="Edit Method"
          name="step"
          fullWidth
          multiline
          value={step.content}
          onChange={(e) => handleChange(e, step.id)}
        />
      </CardContent>
      <CardActions>
        <IconButton
          onClick={() => handleDelete(step.id)}
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
