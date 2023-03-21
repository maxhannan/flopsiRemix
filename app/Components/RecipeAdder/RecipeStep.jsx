import { Card, IconButton, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";

import { MdClose } from "react-icons/md";

const RecipeStep = ({ step, handleDelete, handleChange }) => {
  return (
    <Card elevation={0}>
      <Box sx={{ display: "flex", mb: "1rem" }}>
        <Typography
          sx={{ flex: "1" }}
          variant="h6"
          color="secondary"
          component="div"
        >
          Step {step.orderNum}
        </Typography>
        <IconButton
          onClick={() => handleDelete(step.id)}
          variant="outlined"
          size="small"
          color="secondary"
        >
          <MdClose size={"1.25rem"} />
        </IconButton>
      </Box>
      <TextField
        variant="outlined"
        label="Edit Method"
        name="step"
        fullWidth
        multiline
        value={step.content}
        onChange={(e) => handleChange(e, step.id)}
      />
    </Card>
  );
};

export default RecipeStep;
