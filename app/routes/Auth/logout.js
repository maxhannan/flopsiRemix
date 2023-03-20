import { redirect } from "@remix-run/node";
import { logout } from "../../utils/auth.server";

export const action = async ({ request }) => logout(request);
export const loader = async () => redirect("/app");
