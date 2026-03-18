import React from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDoorOpen } from '@fortawesome/free-solid-svg-icons';
import useAuth from '../hooks/useAuth';

const LogoutButton = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout(); // clear auth
    navigate("/login", { replace: true }); // redirect immediately
  };
  return (
    <div className="sidebar-menu" onClick={handleLogout}>
      <FontAwesomeIcon icon={faDoorOpen} className="nav-icon" />
      <span>Logout</span>
    </div>
  );
};

export default LogoutButton;