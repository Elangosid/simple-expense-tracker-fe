import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchSummary } from "../../features/expense/expenseSlice";

export default function ExpenseSummary() {
  const dispatch = useDispatch();
  const { items, summary } = useSelector((state) => state.expenses);

  useEffect(() => {
    dispatch(fetchSummary());
  }, [dispatch, items.length]);

  return (
    <div className="bg-white rounded-xl">
      <p className="text-gray-800 font-medium mb-2">Total: ₹{summary.total}</p>
      <ul className="list-disc list-inside text-gray-600 space-y-1">
        {Object.entries(summary.byCategory).map(([category, amount]) => (
          <li key={category}>
            {category}: ₹{amount}
          </li>
        ))}
      </ul>
    </div>
  );
}
