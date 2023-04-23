// rrd import

import { useLoaderData } from "react-router-dom";

// component import
import Table from "../components/Table";

// import toast
import { toast } from "react-toastify";

// helper
import { deleteItem, fetchData } from "../helpers";

// loader

export async function expensesLoader() {
  const expenses = fetchData("expenses");
  return { expenses };
}

// action

export async function expensesAction({ request }) {
  const data = await request.formData();
  const { _action, ...values } = Object.fromEntries(data);
  if (_action === "deleteExpense") {
    try {
      // delete an Expense
      deleteItem({
        key: "expenses",
        id: values.expenseId,
      });
      return toast.success("Expense deleted !");
    } catch (e) {
      throw new Error("Something went wrong deleting your Expense");
    }
  }
}

const ExpensesPage = () => {
  const { expenses } = useLoaderData();

  return (
    <div className="grid-lg">
      <h1>All Expenses</h1>

      {expenses && expenses.length > 0 ? (
        <div className="grid-md">
          <h2>
            Recent Expenses <small>({expenses.length} total)</small>
          </h2>
          <Table expenses={expenses} />
        </div>
      ) : (
        <p>No expenses found</p>
      )}
    </div>
  );
};
export default ExpensesPage;
