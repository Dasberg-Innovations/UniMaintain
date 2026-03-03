import { Routes, Route, Navigate } from 'react-router-dom';
import Register from './pages/Register';
import Login from './pages/Login';
import Admin from './pages/AdminDashboard';
import User from './pages/UserDashboard';
import Maintenance from './pages/MaintenanceDashboard';
import ReportForm from './pages/ReportForm';
import Unauthorized from './pages/Unauthorized';
import RequireAuth from './components/RequireAuth';
import Layout from "./components/Layout";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {/* Redirect root to login */}
        <Route index element={<Navigate to="/login" replace />} />

        {/* Public Routes*/}
        <Route path="register" element={<Register />} />
        <Route path="login" element={<Login />} />
        <Route path="unauthorized" element={<Unauthorized />} />
        <Route path="reportform" element={<ReportForm />} />

        {/* Protected Routes*/}
        <Route element={<RequireAuth allowedRoles={["user"]} />}>
          <Route path="user" element={<User />} />
        </Route>
        <Route element={<RequireAuth allowedRoles={["admin"]} />}>
          <Route path="admin" element={<Admin />} />
        </Route>
        <Route element={<RequireAuth allowedRoles={["maintenance"]} />}>
          <Route path="maintenance" element={<Maintenance />} />
        </Route>
        
      </Route>

    </Routes>

  );
}


export default App;
