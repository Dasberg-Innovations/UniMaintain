import { Routes, Route, Navigate } from 'react-router-dom';
import Register from './pages/Register'; // put your Register component in pages
import Login from './pages/Login';       // optional, create later

function App() {
  return (
    <Routes>
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>

  );
}


export default App;
