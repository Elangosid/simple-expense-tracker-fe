import ExpenseForm from "../components/form/expenseForm";
import ExpenseList from "../components/list/expenseList";
import ExpenseSummary from "../components/summary/expenseSummry";
import CSVExport from "../components/csvExport/csvExport";
import CSVImport from "../components/csvImport/csvImport";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchExpenses } from "../features/expense/expenseSlice";

const Expenses = () => {
  const dispatch = useDispatch();
  const { items } = useSelector((state) => state.expenses);

  useEffect(() => {
    dispatch(fetchExpenses());
  }, [dispatch]);

  return (
    <>
      <div className="flex flex-wrap items-center justify-between gap-4 bg-white shadow rounded-lg p-4">
        <CSVImport />
        <CSVExport />
      </div>

      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">
          Add New Expense
        </h2>
        <ExpenseForm />
      </div>

      {items.length > 0 && (
        <>
          <div className="bg-white p-6 rounded-lg shadow overflow-auto">
            <h2 className="text-xl font-semibold text-gray-700">
              Expense List
            </h2>
            <ExpenseList />
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold text-gray-700 mb-4">
              Summary
            </h2>
            <ExpenseSummary />
          </div>
        </>
      )}
    </>
  );
};

export default Expenses;
