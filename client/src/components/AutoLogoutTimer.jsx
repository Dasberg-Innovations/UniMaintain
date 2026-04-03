import { useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthProvider";

export default function AutoLogoutTimer() {
  const { auth, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!auth.accessToken || !auth.expiresInMinutes) return;

    const timeout = auth.expiresInMinutes * 60 * 1000;

    const timer = setTimeout(() => {
      logout(); // clear auth
      navigate("/login"); // redirect safely
    }, timeout);

    return () => clearTimeout(timer);
  }, [auth, logout, navigate]);

  return null; // this component renders nothing
}