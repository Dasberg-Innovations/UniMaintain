import React from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDoorOpen } from '@fortawesome/free-solid-svg-icons';
import useAuth from '../hooks/useAuth';

// Logout button for sidebar navigation
const LogoutButton = () => {

  // access logout function from auth context
  const { logout } = useAuth();
  // for redirecting after logout
  const navigate = useNavigate();

  // handle logout click
  const handleLogout = () => {
    logout(); // clear authentication
    navigate("/login", { replace: true }); // redirect to login immediately
  };
  return (
    <div className="sidebar-menu" onClick={handleLogout}>
      <FontAwesomeIcon icon={faDoorOpen} className="nav-icon" /> 
      <span>Logout</span>
    </div>
  );
};

export default LogoutButton;