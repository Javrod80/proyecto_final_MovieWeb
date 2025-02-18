// Proveedor del contexto usuario

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

        // Verificar si hay un token y un userId en el almacenamiento local
        if (token && storeUserId) {
            setIsAuthenticated(true);
            setUserId(storeUserId);
        }
    }, []);

    // Funciones para manejar la autenticación
    const login = (id) => {
        setIsAuthenticated(true);
        setUserId(id);
        localStorage.setItem('userId', id);
    };

    // Función para manejar el cierre de sesión
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
