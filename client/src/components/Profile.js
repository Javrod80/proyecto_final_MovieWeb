/**
 * Componente para mostrar el perfil del usuario.
 * 
 * Este componente permite a los usuarios ver su perfil, incluyendo enlaces a sus películas favoritas y vistas,
 * cambiar su contraseña y eliminar su cuenta. Los usuarios pueden acceder a sus favoritos y películas vistas 
 * a través de botones de navegación, y también tienen la opción de cambiar su contraseña o eliminar su cuenta.
 * 
 * @component
 * @example
 * return (
 *   <Profile />
 * )
 */
import React from 'react';
import { useNavigate } from 'react-router-dom';
import peliculasImage from '../images/peliculas96.png';
import DeleteAccount from './DeleteAccount';
import ResetPassword from './ResetPassword';


const Profile = () => {
    /**
     * Hook de navegación para cambiar de página.
     * @type {Function}
     */
    const navigate = useNavigate();

    /**
     * Función para navegar a la página de favoritos.
     * @returns {void}
     */
    
    const goToFavorites = () => {
        navigate('/favorites'); 
    };
    /**
    * Función para navegar a la página de vistas.
    * @returns {void}
    */
const goToWatched = () => {
    navigate('/watched'); 
};
    // Renderizar el perfil del usuario
    return (
        <div className="container mt-4"> 
            <div className="card p-3" style={{ maxWidth: '600px', margin: 'auto', top: '80px' }}> 
                <div className="card-body text-center">
                    <h2 className="mb-3">Perfil de Usuario</h2> 
                    <p className="mb-3">Aquí podrás ver tus películas favoritas y vistas.</p> 
                    <img
                        src={peliculasImage}
                        alt="Imagen de fondo"
                        className="img-fluid mb-3" 
                        style={{ maxWidth: "250px" }} 
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
                    {/*Botón para cambiar la contraseña*/} 
                    <div className="mt-3"> 
                        <ResetPassword />
                    </div>
                    {/*Botón para eliminar la cuenta*/}
                    <div className="mt-2"> 
                        <DeleteAccount />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;