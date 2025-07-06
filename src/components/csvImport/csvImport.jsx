// src/components/CSVImport.js
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { importCSV } from "../../features/expense/expenseSlice";

export default function CSVImport() {
  const dispatch = useDispatch();
  const [file, setFile] = useState(null);

  const handleImport = (e) => {
    e.preventDefault();
    if (file) {
      dispatch(importCSV(file));
      setFile(null);
    } else {
      alert("Please select a CSV file");
    }
  };

  return (
    <form onSubmit={handleImport} className="flex gap-2 items-center">
      <input
        type="file"
        accept=".csv"
        onChange={(e) => setFile(e.target.files[0])}
        className="border border-gray-300 p-2 rounded file:mr-4"
      />
      <button
        type="submit"
        className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded transition"
      >
        Import CSV
      </button>
    </form>
  );
}
