import { redirect } from "react-router";

export const loader = () => {
  return redirect("/auth/login");
};
const AuthIndex = () => {
  return <h1>index route</h1>;
};

export default AuthIndex;
