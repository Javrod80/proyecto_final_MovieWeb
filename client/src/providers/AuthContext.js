/**
 * Proveedor del contexto de autenticación para el manejo de sesión de usuario.
 * 
 * Este componente crea un contexto que permite a la aplicación manejar el estado de autenticación del usuario. 
 * Proporciona funciones para iniciar sesión, cerrar sesión y verificar si el usuario está autenticado.
 * Utiliza `localStorage` para persistir el estado de autenticación entre sesiones.
 * 
 * @component
 * @example
 * 
 * <AuthProvider>
 *   <App />
 * </AuthProvider>
 * 
 * @returns {JSX.Element} El proveedor de contexto que envuelve el árbol de componentes.
 */

import React, { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

/**
 * Hook personalizado para acceder al contexto de autenticación.
 * 
 * Este hook proporciona el estado de autenticación actual y las funciones para 
 * manejar la sesión del usuario (iniciar sesión y cerrar sesión).
 * 
 * @returns {Object} El contexto de autenticación con el estado y funciones necesarias.
 * @property {boolean} isAuthenticated - Estado que indica si el usuario está autenticado.
 * @property {string|null} userId - El ID del usuario autenticado o null si no está autenticado.
 * @property {string|null} userRole - El rol del usuario autenticado o null si no está autenticado.
 * @property {Function} login - Función para autenticar al usuario con un ID y rol.
 * @property {Function} logout - Función para cerrar sesión y eliminar el estado de autenticación.
 */
export const useAuth = () => {
    return useContext(AuthContext);
};


export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [userId, setUserId] = useState(null);
    const [userRole, setUserRole] = useState(null); 

    
    useEffect(() => {
        const token = localStorage.getItem("token");
        const storedUserId = localStorage.getItem("userId");
        const storedUserRole = localStorage.getItem("rol"); 

        if (token && storedUserId && storedUserRole) {
            setIsAuthenticated(true);
            setUserId(storedUserId);
            setUserRole(storedUserRole);
        }
    }, []);

   
    const login = (id, rol) => {
        setIsAuthenticated(true);
        setUserId(id);
        setUserRole(rol); 
        localStorage.setItem("userId", id);
        localStorage.setItem("rol", rol); 
    };

    
    const logout = () => {
        localStorage.removeItem("token");  
        localStorage.removeItem("userId");  
        localStorage.removeItem("rol");  
        setIsAuthenticated(false);
        setUserId(null);
        setUserRole(null);
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, userId, userRole, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
