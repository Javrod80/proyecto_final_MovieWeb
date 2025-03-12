import React, {  useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import peliculasImage from '../images/peliculas96.png';
import UploadForm from './UploadForm'; 
import DeleteAccount from './DeleteAccount';
import ResetPassword from './ResetPassword';
import useFetch from '../hooks/useFetch';
import {useProfileImage} from '../providers/ProfileImageContext';
/**
 * Componente principal de perfil de usuario.
 * Muestra la información del perfil, la imagen de perfil y permite realizar acciones como cambiar contraseña, eliminar cuenta o subir una nueva imagen de perfil.
 * @component
 * @returns {JSX.Element} El componente del perfil de usuario.
 */
const Profile = () => {
     /**
     * Navegador para redireccionar a otras rutas.
     * @constant {function} navigate
     */
    const navigate = useNavigate();
     /**
     * Estado para almacenar la URL relativa de la imagen de perfil del usuario.
     * @constant {string|null} profileImage - Contiene la ruta de la imagen de perfil o `null` si no está disponible.
     */
        const { profileImage, setProfileImage } = useProfileImage();
        const {  error } = useFetch

    useEffect(() => {
        if (error) {
            console.error("Error al obtener la imagen de perfil:", error);
        }
    }, [error]); 
   
    useEffect(() => {

    }, [profileImage]);
        

 /**
     * Redirecciona al usuario a la página de películas favoritas.
     * @function goToFavorites
     */
    const goToFavorites = () => {
        navigate('/favorites');
    };
   /**
     * Redirecciona al usuario a la página de películas vistas.
     * @function goToWatched
     */
    const goToWatched = () => {
        navigate('/watched');
    };
 /**
     * Callback para manejar la subida de una nueva imagen.
     * Actualiza el estado `profileImage` con la nueva imagen subida.
     * @function handleImageUpload
     * @param {string} imagePath - Ruta de la nueva imagen subida.
     */
    const handleImageUpload = (imagePath) => {
        setProfileImage(imagePath);
    };

    return (
        <div className="container mt-4">
            <div className="card p-3" style={{ maxWidth: '600px', margin: 'auto', top: '80px' }}>
                <div className="card-body text-center">
                    <h2 className="mb-3">Perfil de Usuario</h2>
                    <p className="mb-3">Aquí podrás ver tus películas favoritas y vistas.</p>
                    
                    <img
                        src={profileImage ? `http://localhost:5000/${profileImage}?t=${new Date().getTime()}` : peliculasImage } 
                        alt="Imagen de perfil"
                        className="img-fluid mb-3"
                        style={{ width: '150px', height: '150px', objectFit: 'cover', borderRadius: '50%' }}
                    />
                       

                    <div className="d-flex justify-content-center mb-3">
                        <button
                            onClick={goToFavorites}
                            className="btn btn-outline-primary btn-lg mx-2">
                            Ver Películas Favoritas
                        </button>
                        <button
                            onClick={goToWatched}
                            className="btn btn-outline-success btn-lg mx-2">
                            Ver Películas Vistas
                        </button>
                    </div>

                    {/* Subir nueva imagen */}
                    <UploadForm onImageUpload={handleImageUpload} /> 

                    <div className="mt-3">
                        <ResetPassword />
                    </div>
                    <div className="mt-2">
                        <DeleteAccount />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;
