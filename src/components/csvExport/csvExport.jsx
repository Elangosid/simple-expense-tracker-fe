import React from "react";
import { useDispatch } from "react-redux";
import { exportCSV } from "../../features/expense/expenseSlice";

export default function CSVExport() {
  const dispatch = useDispatch();

  const handleExport = () => {
    dispatch(exportCSV());
  };

  return (
    <button
      onClick={handleExport}
      className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded transition"
    >
      Export CSV
    </button>
  );
}
