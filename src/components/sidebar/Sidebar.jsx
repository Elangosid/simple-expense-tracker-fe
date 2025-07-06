// src/components/sidebar/Sidebar.jsx
import { Link, useLocation } from "react-router-dom";

function Sidebar() {
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <aside className="w-64 bg-white shadow-md px-6 py-8 hidden md:block">
      <h2 className="text-2xl font-bold mb-8 text-indigo-600">ExpenseTracker</h2>
      <nav className="space-y-4 text-gray-700">
        <Link
          to="/"
          className={`block px-3 py-2 rounded hover:bg-indigo-50 ${
            isActive("/") ? "bg-indigo-100 text-indigo-700 font-semibold" : ""
          }`}
        >
          Dashboard
        </Link>
        <Link
          to="/expenses"
          className={`block px-3 py-2 rounded hover:bg-indigo-50 ${
            isActive("/expenses") ? "bg-indigo-100 text-indigo-700 font-semibold" : ""
          }`}
        >
          Expenses
        </Link>
      </nav>
    </aside>
  );
}

export default Sidebar;
