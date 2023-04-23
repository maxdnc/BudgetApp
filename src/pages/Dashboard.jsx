// rrd import
import { Link, useLoaderData } from "react-router-dom";

// librairy
import { toast } from "react-toastify";

// helper
import {
  createBudget,
  fetchData,
  wait,
  createExpense,
  deleteItem,
} from "../helpers";

// components
import { Intro } from "../components/Intro";
import AddBudgetForm from "../components/AddBudgetForm";
import AddExpenseForm from "../components/AddExpenseForm";
import BudgetItem from "../components/BudgetItem";
import Table from "../components/Table";

// loader

export function dashboardLoader() {
  const userName = fetchData("userName");
  const budgets = fetchData("budgets");
  const expenses = fetchData("expenses");

  return { userName, budgets, expenses };
}

// action

export async function dashboardAction({ request }) {
  await wait();

  const data = await request.formData();
  const { _action, ...values } = Object.fromEntries(data);
  // new user sub
  if (_action === "newUser") {
    try {
      localStorage.setItem("userName", JSON.stringify(values.userName));
      return toast.success(`Welcome, ${values.userName} !`);
    } catch (e) {
      throw new Error("Something went wrong creating your account");
    }
  }
  // new budget sub
  if (_action === "createBudget") {
    try {
      // create budget
      createBudget({
        name: values.newBudget,
        amount: values.newBudgetAmount,
      });
      return toast.success(`Budget created !`);
    } catch (e) {
      throw new Error("Something went wrong creating your budget");
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

const Dashboard = () => {
  const { userName, budgets, expenses } = useLoaderData();
  return (
    <>
      {userName ? (
        <div className="dashboard">
          <h1>
            Welcome back, <span className="accent">{userName}</span>
          </h1>

          <div className="grid-sm">
            {budgets && budgets.length > 0 ? (
              <div className="grid-lg">
                <div className="flex-lg">
                  <AddBudgetForm />
                  <AddExpenseForm budgets={budgets} />
                </div>
                <h2>Existing Budgets</h2>
                <div className="budgets">
                  {budgets.map((budget) => (
                    <BudgetItem key={budget.id} budget={budget} />
                  ))}
                </div>
                {expenses && expenses.length > 0 && (
                  <div className="grid-md">
                    <h2>Recent Expenses</h2>
                    <Table
                      expenses={expenses
                        .sort((a, b) => b.createdAt - a.createdAt)
                        .slice(0, 5)}
                    />
                    {expenses.length > 5 && (
                      <Link to="expenses" className="btn btn-dark">
                        View all expenses
                      </Link>
                    )}
                  </div>
                )}
              </div>
            ) : (
              <div className="grid-sm">
                <p>Personal budgeting is the secret to financial freedom.</p>
                <p>Create a budget to get started!</p>
                <AddBudgetForm />
              </div>
            )}
          </div>
        </div>
      ) : (
        <Intro />
      )}
    </>
  );
};
export default Dashboard;
