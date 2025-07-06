import { useDispatch, useSelector } from "react-redux";
import { setSortFilter } from "../../features/expense/expenseSlice";

export default function ExpenseFilter() {
  const dispatch = useDispatch();
  const { sortBy, order } = useSelector((state) => state.expenses.filters);

  const handleSortChange = (e) => {
    dispatch(setSortFilter({ sortBy: e.target.value, order }));
  };

  const handleOrderChange = (e) => {
    dispatch(setSortFilter({ sortBy, order: e.target.value }));
  };

  return (
    <div className="bg-white rounded-xl flex flex-wrap gap-4 items-center mb-6">
      <div className="flex flex-col sm:flex-row gap-2 sm:items-center">
        <label className="text-gray-700 font-medium">Sort By:</label>
        <select
          value={sortBy}
          onChange={handleSortChange}
          className="border border-gray-300 rounded px-3 py-2 text-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          <option value="date">Date</option>
          <option value="price">Price</option>
        </select>
      </div>
      <div className="flex flex-col sm:flex-row gap-2 sm:items-center">
        <label className="text-gray-700 font-medium">Order:</label>
        <select
          value={order}
          onChange={handleOrderChange}
          className="border border-gray-300 rounded px-3 py-2 text-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          <option value="desc">Descending</option>
          <option value="asc">Ascending</option>
        </select>
      </div>
    </div>
  );
}
