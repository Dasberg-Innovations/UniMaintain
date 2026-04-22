import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";

// Protects routes based on allowed user roles
const RequireAuth = ( {allowedRoles} ) => {
    const { auth } = useAuth();     // access current auth state
    const location = useLocation(); // store current location for redirects

    return (
        allowedRoles?.includes(auth?.role)
            ? <Outlet />    // user has permission, render route
            : auth?.role
                ? <Navigate to="/unauthorized" state={{ from: location}} replace /> // logged in but not allowed
                : <Navigate to="/login" state={{ from: location}} replace />        // not logged in
    );
}

export default RequireAuth;