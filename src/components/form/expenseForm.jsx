import { useState } from "react";
import { useDispatch } from "react-redux";
import { addExpense } from "../../features/expense/expenseSlice";
import { toast } from "react-toastify";

export default function ExpenseForm() {
  const dispatch = useDispatch();
  const [form, setForm] = useState({
    description: "",
    amount: "",
    category: "Food",
  });

const handleSubmit = async (e) => {
  e.preventDefault();
  const newExpense = {
    ...form,
    amount: Number(form.amount),
    date: new Date().toISOString(),
  };
  try {
    await dispatch(addExpense(newExpense))
    toast.success("Expense added!");
    setForm({ description: "", amount: "", category: "Food" });
  } catch (error) {
    toast.error("Failed to add expense.");
  }
};


  return (
    <form
      onSubmit={handleSubmit}
      className="p-6 bg-white rounded-xl space-y-4 md:grid md:grid-cols-4 md:gap-4 md:space-y-0"
    >
      <input
        className="border border-gray-300 p-2 rounded col-span-1"
        placeholder="Description"
        value={form.description}
        onChange={(e) => setForm({ ...form, description: e.target.value })}
        required
      />
      <input
        type="number"
        className="border border-gray-300 p-2 rounded col-span-1"
        placeholder="Amount"
        value={form.amount}
        onChange={(e) => setForm({ ...form, amount: e.target.value })}
        required
      />
      <select
        className="border border-gray-300 p-2 rounded col-span-1"
        value={form.category}
        onChange={(e) => setForm({ ...form, category: e.target.value })}
      >
        <option>Food</option>
        <option>Transport</option>
        <option>Shopping</option>
        <option>Utilities</option>
      </select>
      <button
        type="submit"
        className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded transition"
      >
        Add
      </button>
    </form>
  );
}
