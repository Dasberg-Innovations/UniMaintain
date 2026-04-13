import { createContext, useState } from "react";

// context for managing authentication state across the app
const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
    // load auth data from localStorage (if available)
    const storedAuth = JSON.parse(localStorage.getItem("auth")) || {};

    // store auth state and login status
    const [auth, setAuth] = useState(storedAuth);
    const [isLoggedIn, setIsLoggedIn] = useState(!!storedAuth.accessToken);

    // clear auth data and reset login state
    const logout = () => {
        setAuth({});
        setIsLoggedIn(false);
        localStorage.removeItem("auth");
    };

    return (
        <AuthContext.Provider value={{ auth, setAuth, isLoggedIn, setIsLoggedIn, logout }}>
            {children}  {/* render wrapped components */}
        </AuthContext.Provider>
    )
}

export { AuthContext };
export default AuthProvider;