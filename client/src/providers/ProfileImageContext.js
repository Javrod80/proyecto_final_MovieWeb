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
    const { fetchData } = useFetch();
    const [token ,setToken] = useState(null);

 
    useEffect(() => {
        const storedToken = localStorage.getItem('token');
     //   console.log("stored",storedToken)
        setToken(storedToken);
    }, []);

    useEffect(() => {
        const fetchProfileImage = async () => {
            

            if (!token) {
                console.log("Token no encontrado. El usuario no está autenticado.");
                setProfileImage(null);
                return;
            }

            try {
                // Decodificar el token y extraer el userId
                const decodedToken = jwtDecode(token);
                const userId = decodedToken.id;

                // Verificar que userId sea válido
                if (!userId) {
                    console.error("El token no contiene un ID de usuario válido.");
                    setProfileImage(null);
                    return;
                }

                // Realizar la solicitud al backend para obtener la imagen de perfil
                const result = await fetchData("users/profile-image", "GET", null, token);

                if (result && result.imagePath) {
                    setProfileImage(result.imagePath);
                } else {
                    console.warn("No se obtuvo una imagen válida del servidor.");
                    setProfileImage(null);
                }
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
