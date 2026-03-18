import { createContext, useState } from "react";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
    const storedAuth = JSON.parse(localStorage.getItem("auth")) || {};
    const [auth, setAuth] = useState(storedAuth);
    const [isLoggedIn, setIsLoggedIn] = useState(!!storedAuth.accessToken);

    const logout = () => {
        setAuth({});
        setIsLoggedIn(false);
        localStorage.removeItem("auth");
    };

    return (
        <AuthContext.Provider value={{ auth, setAuth, isLoggedIn, setIsLoggedIn, logout }}>
            {children}
        </AuthContext.Provider>
    )
}

export { AuthContext };
export default AuthProvider;