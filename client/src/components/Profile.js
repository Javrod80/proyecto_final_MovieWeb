import React from 'react';
import { useNavigate } from 'react-router-dom';
import peliculasImage from '../images/peliculas96.png';


const Profile = () => {
    const navigate = useNavigate();
    const goToFavorites = () => {
        navigate('/favorites'); // Navegar a la página de favoritos
    };

    return (
        <div className="profile-page">
            <div className="profile">
                <h2>Perfil de Usuario</h2>
                <p>Aquí podrás ver tus películas favoritas.</p>
                <img src={peliculasImage} alt="Imagen de fondo" />
                <button onClick={goToFavorites} className="btn secondary-btn">Ver Películas Favoritas</button>

            </div>
        </div>
    );
};

export default Profile;