import useAuth from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";

const UserDashboard  = () => {

    const { logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate("/login", { replace: true });
    };

    return (
        <div>
            <h1>User Dashboard Page</h1>
            <button onClick={handleLogout}>Logout</button>
        </div>
        
      );
}
 
export default UserDashboard;