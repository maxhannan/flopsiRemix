import { Box, Divider, Grid, Typography } from "@mui/material";
import { Stack } from "@mui/system";

const RecipeInstructions = ({ instructions }) => {
  return (
    <Grid item xs={12} sm={12} md={12}>
      <Box sx={{ width: "100%" }}>
        <Typography variant="h4">Process</Typography>
        <Divider sx={{ marginY: ".5rem" }} />
        <Stack spacing={2}>
          {instructions &&
            instructions.map((i) => {
              return (
                <Box key={i}>
                  <Typography variant="h6" color="secondary">
                    Step {instructions.indexOf(i) + 1}
                  </Typography>
                  <Typography variant="body1">{i}</Typography>
                </Box>
              );
            })}
        </Stack>
      </Box>
    </Grid>
  );
};

export default RecipeInstructions;
