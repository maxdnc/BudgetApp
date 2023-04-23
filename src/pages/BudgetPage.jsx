// import helper
import { createExpense, deleteItem, getAllMatchingItems } from "../helpers";
// rrd import
import { useLoaderData } from "react-router-dom";

// library import
import { toast } from "react-toastify";

// component import

import Table from "../components/Table";
import AddExpenseForm from "../components/AddExpenseForm";
import BudgetItem from "../components/BudgetItem";

// loader

export async function budgetLoader({ params }) {
  const budget = await getAllMatchingItems({
    category: "budgets",
    key: "id",
    value: params.id,
  })[0];

  const expenses = await getAllMatchingItems({
    category: "expenses",
    key: "budgetId",
    value: params.id,
  });

  if (!budget) {
    throw new Error("Budget not found");
  }

  return { budget, expenses };
}

// action

export async function budgetAction({ request }) {
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

  if (_action === "createExpense") {
    try {
      // create an Expense
      createExpense({
        name: values.newExpense,
        amount: values.newExpenseAmount,
        budgetId: values.newExpenseBudget,
      });
      return toast.success(`Expense ${values.newExpense} created !`);
    } catch (e) {
      throw new Error("Something went wrong creating your Expense");
    }
  }
}

const BudgetPage = () => {
  const { budget, expenses } = useLoaderData();
  return (
    <div
      className="grid-lg"
      style={{
        "--accent": budget.color,
      }}
    >
      <h1 className="h2">
        <span className="accent">{budget.name} </span>
        Overview
      </h1>
      <div className="flex-lg">
        <BudgetItem budget={budget} showDelete={true} />
        <AddExpenseForm budgets={[budget]} />
      </div>

      {
        // if expenses exist, show them
        expenses && expenses.length > 0 && (
          <div className="grid-md">
            <h2>
              <span className="accent">{budget.name} </span>{" "}
            </h2>

            <Table expenses={expenses} showBudget={false} />
          </div>
        )
      }
    </div>
  );
};
export default BudgetPage;
