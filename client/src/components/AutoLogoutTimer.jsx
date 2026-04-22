import { useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthProvider";
import { jwtDecode } from "jwt-decode";

export default function AutoLogoutTimer() {
  
  // access auth state and logout function
  const { auth, logout } = useContext(AuthContext);
  // to navigate
  const navigate = useNavigate();

  useEffect(() => {
    if (!auth.accessToken) return;  // exit if no token
    // decode token to get expiry
    const decoded = jwtDecode(auth.accessToken);
    // convert to milliseconds
    const expiryTime = decoded.exp * 1000;
    const currentTime = Date.now();
    // remaining time until expiry
    const timeout = expiryTime - currentTime;

    if (timeout <= 0) {   // token expired
      logout();
      navigate("/login");
      return;
    }

    const timer = setTimeout(() => {
      logout();           // log out user
      navigate("/login"); // redirect to login
      alert("You have been logged out!"); // inform user
    }, timeout);

    return () => clearTimeout(timer);     // cleanup on unmount or token change
  }, [auth?.accessToken]); // re-run effect if token changes

  return null;  // component doesn't render anything
}