import React, { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const useAuth = () => {
    return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [userId, setUserId] = useState(null);

    // Verificar si el usuario ya está autenticado cuando se monta el componente
    useEffect(() => {
        const token = localStorage.getItem('token');
        const storeUserId = localStorage.getItem('userId');

       // console.log("Token en localStorage:", token);
       // console.log("UserID en localStorage:", storeUserId);

        
        if (token && storeUserId) {
            setIsAuthenticated(true);
            setUserId(storeUserId);
        }
    }, []);

    const login = (id) => {
        setIsAuthenticated(true);
        setUserId(id);
        localStorage.setItem('userId', id);
    };

    const logout = () => {
        localStorage.removeItem('token');  // Eliminar el token al hacer logout
        localStorage.removeItem('userId');  // Eliminar el userId al hacer logout
        setIsAuthenticated(false);
        setUserId(null);
    };

   

    return (
        <AuthContext.Provider value={{ isAuthenticated, userId,login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
