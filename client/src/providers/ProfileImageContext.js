import React, { createContext, useContext, useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode';
import useFetch from "../hooks/useFetch";

/**
 * Contexto para almacenar la imagen de perfil del usuario.
 */
const ProfileImageContext = createContext();

/**
 * Proveedor del contexto de la imagen de perfil.
 * 
 * @param {Object} props - Propiedades del componente.
 * @param {React.ReactNode} props.children - Componentes hijos que estarán envueltos por el proveedor.
 * @returns {JSX.Element} Proveedor del contexto de la imagen de perfil.
 */
export const ProfileImageProvider = ({ children }) => {
    /**
    * Estado que almacena la imagen de perfil del usuario.
    * @type {FileFunctionArray}
    */
    const [profileImage, setProfileImage] = useState(null);
    const { fetchData  } = useFetch();
    const [token, setToken] = useState(localStorage.getItem('token'));
    

    useEffect(() => {
       
        const checkToken = () => {
            const storedToken = localStorage.getItem('token');
            if (storedToken !== token) {
                setToken(storedToken);
            }
        };
            // para obtener asegurarce el token de localStorage
        
        const tokenCheckInterval = setInterval(checkToken, 500);

        return () => clearInterval(tokenCheckInterval); 
    }, [token]);
  

    useEffect(() => {
        const fetchProfileImage = async () => {
            if (!token) return; 
            try {
                // Decodificar el token y extraer el userId
                const decodedToken = jwtDecode(token);
                const userId = decodedToken.id;

                if (!userId) {
                    console.error("El token no contiene un ID de usuario válido.");
                    setProfileImage(null);
                    return;
                }

                console.log("Llamando a fetchData...");
                const result = await fetchData("users/profile-image", "GET", null, token);
                console.log("token:", token);
                console.log("respuesta:", result);
                setProfileImage(result?.imagePath ?? null);
                console.log("Imagen de perfil actualizada:", result?.imagePath);
            } catch (error) {
                console.error("Error al obtener la imagen de perfil:", error);
                setProfileImage(null);
            }
        };

        if (token) {
            fetchProfileImage();
        }
    }, [fetchData, token]);
    
    return (
        <ProfileImageContext.Provider value={{ profileImage, setProfileImage }}>
            {children}
        </ProfileImageContext.Provider>
    );
};

/**
 * Hook personalizado para acceder al contexto de la imagen de perfil.
 * 
 * @returns {{ profileImage: string|null, setProfileImage: Function }} Valor del contexto de la imagen de perfil.
 */
export const useProfileImage = () => useContext(ProfileImageContext);
