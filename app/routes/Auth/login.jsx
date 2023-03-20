import Avatar from "@mui/material/Avatar";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";

import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { MdLock } from "react-icons/md";

import { Button } from "@mui/material";
import { json, redirect } from "@remix-run/node";
import { validateName, validatePassword } from "../../utils/validators.server";
import { getUser, login } from "../../utils/auth.server";
import { Form, Link } from "@remix-run/react";

export const loader = async ({ request }) => {
  // If there's already a user in the session, redirect to the home page
  return (await getUser(request)) ? redirect("/") : null;
};

export const action = async ({ request }) => {
  const form = await request.formData();

  const username = form.get("username");
  const password = form.get("password");

  if (typeof username !== "string" || typeof password !== "string") {
    return json({ error: `Invalid Form Data` }, { status: 400 });
  }
  const errors = {
    email: validateName(username),
    password: validatePassword(password),
  };
  if (Object.values(errors).some(Boolean))
    return json(
      {
        errors,
        fields: { username, password },
        form: action,
      },
      { status: 400 }
    );
  return await login({ username, password });
};

const loginComponent = () => {
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <MdLock />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <Form method="post">
          <TextField
            margin="normal"
            color="secondary"
            required
            fullWidth
            id="username"
            label="Username"
            name="username"
            autoComplete="username"
            autoFocus
          />
          <TextField
            margin="normal"
            required
            fullWidth
            color="secondary"
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
          />

          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <Button
            type="submit"
            color="secondary"
            fullWidth
            disableElevation
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign In
          </Button>
        </Form>
        <Grid container>
          <Grid item xs>
            <Link to="/auth/register">
              <Typography color="primary" variant="body2">
                Forgot password?
              </Typography>
            </Link>
          </Grid>
          <Grid item>
            <Link to="/auth/register">
              <Typography color="primary" variant="body2">
                Don't have an account? Sign Up
              </Typography>
            </Link>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default loginComponent;
