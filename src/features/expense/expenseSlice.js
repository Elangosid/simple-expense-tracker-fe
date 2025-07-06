import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../utils/api";
import { toast } from "react-toastify";

export const fetchExpenses = createAsyncThunk("expenses/fetch", async () => {
  const res = await api.expenses.getAll();
  return res.data;
});

export const addExpense = createAsyncThunk("expenses/add", async (expense) => {
  const res = await api.expenses.add(expense);
  return res.data;
});

export const deleteExpense = createAsyncThunk("expenses/delete", async (id) => {
  await api.expenses.delete(id);
  toast.success("Expense deleted!");
  return id;
});

export const fetchSummary = createAsyncThunk("expenses/summary", async () => {
  const res = await api.expenses.getSummary();
  return res.data;
});

export const importCSV = createAsyncThunk(
  "expenses/importCSV",
  async (file, { dispatch, rejectWithValue }) => {
    try {
      const res = await api.expenses.importCSV(file);

      await dispatch(fetchExpenses());
      await dispatch(fetchSummary());

      toast.success("Imported successfully!");
      return res.data;
    } catch (error) {
      toast.error("Import failed");
      return rejectWithValue(error.message);
    }
  }
);
export const exportCSV = createAsyncThunk(
  "expenses/exportCSV",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.expenses.exportCSV(); 
      const downloadUrl = response?.data?.url;
      if (!downloadUrl) throw new Error("No download URL received");

      window.open(downloadUrl, "_blank");

      toast.success("Exported successfully!");
      return true;
    } catch (error) {
      console.error("Export failed:", error);
      toast.error("Export failed");
      return rejectWithValue(error.message);
    }
  }
);


const initialState = {
  items: [],
  summary: { total: 0, byCategory: {} },
  loading: false,
  filters: {
    sortBy: "date",
    order: "desc",
  },
};

const expenseSlice = createSlice({
  name: "expenses",
  initialState,
  reducers: {
    setSortFilter: (state, action) => {
      state.filters = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchExpenses.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchExpenses.fulfilled, (state, action) => {
        state.items = action.payload;
        state.loading = false;
      })
      .addCase(fetchExpenses.rejected, (state) => {
        state.loading = false;
      })

      .addCase(addExpense.fulfilled, (state, action) => {
        state.items.unshift(action.payload);
      })

      .addCase(deleteExpense.fulfilled, (state, action) => {
        state.items = state.items.filter((exp) => exp._id !== action.payload);
      })

      .addCase(fetchSummary.fulfilled, (state, action) => {
        state.summary = action.payload;
      });
  },
});

export const { setSortFilter } = expenseSlice.actions;
export default expenseSlice.reducer;
