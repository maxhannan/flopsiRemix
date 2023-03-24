import { redirect } from "@remix-run/node";

export const loader = () => {
  return redirect("/auth/login");
};

const AuthIndex = () => {
  return <h1>index route</h1>;
};

export default AuthIndex;
