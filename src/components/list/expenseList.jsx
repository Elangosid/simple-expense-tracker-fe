import { useDispatch, useSelector } from "react-redux";
import {
  deleteExpense,
} from "../../features/expense/expenseSlice";
import ExpenseFilter from "../form/ExpenseFilter";

export default function ExpenseList() {
  const dispatch = useDispatch();
  const { items, filters } = useSelector((state) => state.expenses);

  const handleDelete = (id) => {
    dispatch(deleteExpense(id));
  };

  const sortedItems = [...items].sort((a, b) => {
    if (filters.sortBy === "price") {
      return filters.order === "asc"
        ? a.amount - b.amount
        : b.amount - a.amount;
    } else if (filters.sortBy === "date") {
      return filters.order === "asc"
        ? new Date(a.date) - new Date(b.date)
        : new Date(b.date) - new Date(a.date);
    }
    return 0;
  });

  return (
    <div className="bg-white p-6 rounded-xl">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">
          All Expenses
        </h2>
        <ExpenseFilter />
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full table-auto border border-gray-200">
          <thead className="bg-white text-gray-600">
            <tr>
              <th className="p-2 text-left">Description</th>
              <th className="p-2 text-left">Amount</th>
              <th className="p-2 text-left">Category</th>
              <th className="p-2 text-right">Action</th>
            </tr>
          </thead>
          <tbody>
            {sortedItems.map((exp) => (
              <tr key={exp._id} className="border-t border-gray-200">
                <td className="p-2">{exp.description}</td>
                <td className="p-2">₹{exp.amount}</td>
                <td className="p-2">{exp.category}</td>
                <td className="p-2 text-right">
                  <button
                    onClick={() => handleDelete(exp._id)}
                    className="text-red-600 hover:text-red-800 font-medium"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
