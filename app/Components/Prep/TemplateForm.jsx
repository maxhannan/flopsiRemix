import { Grid, TextField } from "@mui/material";

const TemplateForm = () => {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <TextField fullWidth label="Prep List name" />
      </Grid>
      <Grid item xs={6}>
        <TextField fullWidth label="Prep List name" />
      </Grid>
      <Grid item xs={6}>
        <TextField fullWidth label="Prep List name" />
      </Grid>
      <Grid item xs={12}>
        <TextField fullWidth label="Prep List name" />
      </Grid>
    </Grid>
  );
};

export default TemplateForm;
