import { Routes, Route, useLocation } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Expenses from "./pages/Expenses";
import Navbar from "./components/navbar/Nabar";
import Sidebar from "./components/sidebar/Sidebar";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const location = useLocation();
  const getTitle = () => {
    switch (location.pathname) {
      case "/expenses":
        return "Expenses";
      case "/reports":
        return "Reports";
      default:
        return "Dashboard";
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex">
      <ToastContainer position="top-right" autoClose={2000} />
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Navbar title={getTitle()} />
        <main className="p-6 space-y-6">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/expenses" element={<Expenses />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}

export default App;
