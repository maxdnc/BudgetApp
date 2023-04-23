// rrd imports
import { redirect } from "react-router-dom";
// helpers
import { deleteItem } from "../helpers";
import { toast } from "react-toastify";

export async function logoutAction() {
  // remove user from local storage to log user out
  deleteItem({ key: "userName" });
  deleteItem({ key: "budgets" });
  deleteItem({ key: "expenses" });

  toast.success("You have been logged out successfully");
  // return redirect to login page
  return redirect("/");
}
