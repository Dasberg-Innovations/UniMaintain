import { useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthProvider";
import { jwtDecode } from "jwt-decode";

export default function AutoLogoutTimer() {
  const { auth, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!auth.accessToken) return;

    const decoded = jwtDecode(auth.accessToken);

    const expiryTime = decoded.exp * 1000;
    const currentTime = Date.now();

    const timeout = expiryTime - currentTime;

    if (timeout <= 0) {
      logout();
      navigate("/login");
      return;
    }

    const timer = setTimeout(() => {
      logout(); // clear auth
      navigate("/login"); // redirect
      alert("You have been logged out!");
    }, timeout);

    return () => clearTimeout(timer);
  }, [auth?.accessToken]);

  return null;
}