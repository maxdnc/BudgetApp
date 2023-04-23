import {
  BrowserRouter,
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

// Layouts
import Main, { mainLoader } from "./layouts/Main";

// Librairies
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Actions
import { logoutAction } from "./actions/logout";
import { dashboardAction } from "./pages/Dashboard";
import { budgetAction } from "./pages/BudgetPage";
import { deleteBudget } from "./actions/deleteBudget";

// Routes
import Dashboard, { dashboardLoader } from "./pages/Dashboard";
import Error from "./pages/Error";
import ExpensesPage, {
  expensesAction,
  expensesLoader,
} from "./pages/ExpensesPage";
import BudgetPage, { budgetLoader } from "./pages/BudgetPage";

const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <Main />,
      loader: mainLoader,
      errorElement: <Error />,
      children: [
        {
          index: true,
          element: <Dashboard />,
          loader: dashboardLoader,
          action: dashboardAction,
          errorElement: <Error />,
        },

        {
          path: "/budget/:id",
          element: <BudgetPage />,
          loader: budgetLoader,
          action: budgetAction,
          errorElement: <Error />,
          children: [
            {
              path: "delete",
              action: deleteBudget,
            },
          ],
        },
        {
          path: "expenses",
          element: <ExpensesPage />,
          loader: expensesLoader,
          action: expensesAction,
          errorElement: <Error />,
        },

        {
          path: "logout",
          action: logoutAction,
        },
      ],
    },
  ],
  {
    basename: "/BudgetApp/",
  }
);

function App() {
  return (
    <div className="App">
      <RouterProvider router={router} />
      <ToastContainer />
    </div>
  );
}

export default App;
