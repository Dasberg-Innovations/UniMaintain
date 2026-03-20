import { Routes, Route, Navigate } from 'react-router-dom';
import useAuth from './hooks/useAuth';
import Register from './pages/Register';
import Login from './pages/Login';
import ReportForm from './pages/ReportForm';
import Unauthorized from './pages/Unauthorized';
import RequireAuth from './components/RequireAuth';
import Layout from "./components/Layout";
import Dashboard from "./components/Dashboard";
import ReportList from "./pages/ReportList";
import ReportDetails from "./pages/ReportDetails";

function App() {
  const { auth } = useAuth() || {};

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
        <Route path="reportlist" element={<ReportList />} />
        <Route path="reports/:id" element={<ReportDetails />} />

        {/* Protected Routes */}
        <Route element={<RequireAuth allowedRoles={["user", "admin", "maintenance"]} />}>
          <Route path="/dashboard" element={<Dashboard role={auth?.role} username={auth?.name} />}/>
        </Route>
        
      </Route>

    </Routes>

  );
}


export default App;
