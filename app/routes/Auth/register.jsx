import Avatar from "@mui/material/Avatar";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";

import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { MdLock } from "react-icons/md";
import { Form, Link } from "@remix-run/react";
import { Button } from "@mui/material";
import { json, redirect } from "@remix-run/node";
import {
  validateEmail,
  validateName,
  validatePassword,
} from "../../utils/validators.server";
import { getUser, register } from "../../utils/auth.server";

export const loader = async ({ request }) => {
  // If there's already a user in the session, redirect to the home page
  return (await getUser(request)) ? redirect("/") : null;
};

export const action = async ({ request }) => {
  const form = await request.formData();
  const email = form.get("email");
  const password = form.get("password");
  const username = form.get("username");
  let firstName = form.get("firstName");
  let lastName = form.get("lastName");

  if (
    typeof email !== "string" ||
    typeof password !== "string" ||
    typeof firstName !== "string" ||
    typeof lastName !== "string"
  ) {
    return json({ error: `Invalid Form Data` }, { status: 400 });
  }
  const errors = {
    email: validateEmail(email),
    password: validatePassword(password),
    firstName: validateName(firstName || ""),
    lastName: validateName(lastName || ""),
  };
  if (Object.values(errors).some(Boolean))
    return json(
      {
        errors,
        fields: { email, password, firstName, lastName },
        form: action,
      },
      { status: 400 }
    );

  return await register({ email, password, username, firstName, lastName });
};

const RegisterComponent = () => {
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
          Sign up
        </Typography>
        <Form method="post">
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="given-name"
                name="firstName"
                required
                fullWidth
                id="firstName"
                label="First Name"
                autoFocus
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                id="lastName"
                label="Last Name"
                name="lastName"
                autoComplete="family-name"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="username"
                label="Username"
                name="username"
                autoComplete="Username"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="new-password"
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            color="secondary"
            fullWidth
            disableElevation
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign up
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
            <Link to="/auth/login">
              <Typography color="primary" variant="body2">
                Already have an account? Sign in
              </Typography>
            </Link>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default RegisterComponent;
