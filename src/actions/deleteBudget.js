//rrd import
import { redirect } from "react-router-dom";

// toaster
import { toast } from "react-toastify";

// helper
import { deleteItem, getAllMatchingItems } from "../helpers";

export function deleteBudget({ params }) {
  try {
    deleteItem({
      key: "budgets",
      id: params.id,
    });
    const associatedExpenses = getAllMatchingItems({
      category: "expenses",
      key: "budgetId",
      value: params.id,
    });
    associatedExpenses.forEach((expense) => {
      deleteItem({
        key: "expenses",
        id: expense.id,
      });
    });

    toast.success("Budget deleted successfully.");
  } catch (e) {
    throw new Error("Error deleting your budget.");
  }
  return redirect("/");
}
