import { redirect } from "@remix-run/node";

export const loader = () => {
  return redirect("/auth/login");
};
export function meta() {
  return {
    // <meta name="description" content="Welcome to the web!" />
    "apple-mobile-web-app-capable": "yes",
    // <meta name="theme-color" content="#f22" />
    "apple-mobile-web-app-status-bar-style": "default",
  };
}
const AuthIndex = () => {
  return <h1>index route</h1>;
};

export default AuthIndex;
