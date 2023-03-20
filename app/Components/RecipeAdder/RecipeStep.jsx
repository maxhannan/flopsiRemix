import {
  Button,
  Card,
  CardActions,
  CardContent,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import { useState } from "react";
import { MdDelete, MdEdit, MdSave } from "react-icons/md";

const RecipeStep = ({ stepNum }) => {
  const [saved, setSaved] = useState(false);
  const [content, setContent] = useState("");
  return (
    <Card variant="outlined">
      <CardContent sx={{ mb: "0", pb: "0" }}>
        <Typography gutterBottom variant="h5" color="secondary" component="div">
          Step {stepNum}
        </Typography>
        {saved ? (
          <Typography variant="body1">{content}</Typography>
        ) : (
          <TextField
            sx={{ mt: "1rem" }}
            variant="outlined"
            label="Edit Method"
            fullWidth
            multiline
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        )}
      </CardContent>
      <CardActions>
        <IconButton
          variant="outlined"
          size="medium"
          color="secondary"
          onClick={() => setSaved(!saved)}
        >
          {saved ? <MdEdit /> : <MdSave />}
        </IconButton>
        <IconButton variant="outlined" size="medium" color="secondary">
          <MdDelete />
        </IconButton>
      </CardActions>
    </Card>
  );
};

export default RecipeStep;
