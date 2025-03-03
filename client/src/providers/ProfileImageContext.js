import React, { createContext, useContext, useState } from 'react';
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
    * @type {[string|null, Function]}
    */
    const [profileImage, setProfileImage] = useState(null);

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
