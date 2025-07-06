import axios from "axios";

const userId = "user-123";

const api = axios.create({
  baseURL: "http://localhost:5000/api",
  headers: {
    "Content-Type": "application/json",
  },
});

export default {
  expenses: {
    getAll: () => api.get(`/expenses?userId=${userId}`),
    add: (data) => api.post(`/expenses`, { ...data, userId }),
    delete: (id) => api.delete(`/expenses/${id}`),
    getSummary: () => api.get(`/expenses/summary?userId=${userId}`),
    exportCSV: () => api.get("/expenses/export"),
    importCSV: (file) => {
      const formData = new FormData();
      formData.append("file", file);
      return api.post("/expenses/import", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
    },
  },
};
