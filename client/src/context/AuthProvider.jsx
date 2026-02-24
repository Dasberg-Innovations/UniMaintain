import { createContext, useState } from "react";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState({});
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const logout = () => {
        setAuth({});
        setIsLoggedIn(false);
    };

    return (
        <AuthContext.Provider value={{ auth, setAuth, isLoggedIn, setIsLoggedIn, logout }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext;