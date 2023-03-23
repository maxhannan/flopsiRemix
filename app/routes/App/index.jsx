import { redirect } from "@remix-run/node";

export const loader = () => {
  return redirect("/app/recipes");
};
const AppIndex = () => {
  return <h1>Hello from Index</h1>;
};

export default AppIndex;
