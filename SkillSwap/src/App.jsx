import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import DashboardAdmin from "./pages/Admin/DashboardAdmin";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/admin/dashboard" />} />
        <Route path="/admin/dashboard" element={<DashboardAdmin />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;