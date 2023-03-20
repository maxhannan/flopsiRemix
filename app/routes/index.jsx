import { redirect } from "@remix-run/node";
import { useLocation } from "@remix-run/react";

export const loader = () => {
  return redirect("/app/recipes");
};

export default function Index() {
  const location = useLocation();

  console.log(location);
  return <h1>Hello from index</h1>;
}
