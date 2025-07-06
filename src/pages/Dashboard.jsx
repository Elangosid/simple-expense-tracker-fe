import { useDispatch, useSelector } from "react-redux";
import {
  PieChart,
  Pie,
  Cell,
  Legend,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { fetchSummary } from "../features/expense/expenseSlice";
import { useEffect } from "react";

const COLORS = [
  "#6366F1",
  "#F59E0B",
  "#10B981",
  "#EF4444",
  "#3B82F6",
  "#8B5CF6",
];

function Dashboard() {
  const dispatch = useDispatch();
  const summary = useSelector((state) => state.expenses.summary);
  console.log(summary,"summary data")
   useEffect(() => {
    dispatch(fetchSummary());
  }, [dispatch]); 

  const data = Object.entries(summary.byCategory || {}).map(
    ([category, amount]) => ({
      name: category,
      value: amount,
    })
  );

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="bg-gray-50 p-4 rounded shadow text-center">
        <h3 className="text-lg font-semibold text-gray-700">Total Expenses</h3>
        <p className="text-3xl font-bold text-indigo-600 mt-2">
          ₹{summary.total}
        </p>
      </div>
      <div className="bg-white p-4 rounded shadow">
        <h3 className="text-lg font-semibold text-gray-700 mb-4">
          By Category
        </h3>
        {data.length === 0 ? (
          <p className="text-gray-500 text-center">No data available</p>
        ) : (
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={data}
                dataKey="value"
                nameKey="name"
                outerRadius={90}
                label
              >
                {data.map((_, index) => (
                  <Cell key={index} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend verticalAlign="bottom" height={36} />
            </PieChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
}

export default Dashboard;
