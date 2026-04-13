import { useContext } from "react";
import { AuthContext } from "../context/AuthProvider";

// custom hook to access auth context
const useAuth = () => {
    return useContext(AuthContext); // return shared auth state
}

export default useAuth;