// Componente para el perfil del usuario
import React from 'react';
import { useNavigate } from 'react-router-dom';
import peliculasImage from '../images/peliculas96.png';
import ChangePassword from '../components/ChangePassword';
import DeleteAccount from './DeleteAccount';


const Profile = () => {
    const navigate = useNavigate();

    
    const goToFavorites = () => {
        navigate('/favorites'); // Navegar a la página de favoritos
    };
const goToWatched = () => {
    navigate('/watched'); // Navegar a la página de vistas
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
                        <ChangePassword />
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