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
 * @property {Function} login - Función para autenticar al usuario con un ID.
 * @property {Function} logout - Función para cerrar sesión y eliminar el estado de autenticación.
 */
export const useAuth = () => {
    return useContext(AuthContext);
};
/**
 * Proveedor que maneja el estado de autenticación y proporciona las funciones de login y logout.
 * 
 * El proveedor guarda el estado de la autenticación en `localStorage`, permitiendo que persista 
 * entre las sesiones. Proporciona funciones para iniciar y cerrar sesión, y para recuperar el estado 
 * de autenticación cuando el componente se monta.
 * 
 * @component
 * @example
 * 
 * <AuthProvider>
 *   <App />
 * </AuthProvider>
 * 
 * @param {Object} props - Props que se pasan al componente.
 * @param {JSX.Element} props.children - Los componentes hijos que están envueltos por el proveedor.
 * 
 * @returns {JSX.Element} El proveedor de contexto de autenticación que envuelve los componentes hijos.
 */
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
