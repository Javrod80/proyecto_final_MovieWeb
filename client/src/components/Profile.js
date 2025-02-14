import React from 'react';
import { useNavigate } from 'react-router-dom';
import peliculasImage from '../images/peliculas96.png';
import ChangePassword from '../components/ChangePassword';


const Profile = () => {
    const navigate = useNavigate();
    const goToFavorites = () => {
        navigate('/favorites'); // Navegar a la página de favoritos
    };
const goToWatched = () => {
    navigate('/watched'); // Navegar a la página de vistas
};

    return (
        <div className="profile-page">
            <div className="profile">
                <h2>Perfil de Usuario</h2>
                <p>Aquí podrás ver tus películas favoritas.</p>
                <img src={peliculasImage} alt="Imagen de fondo" />
                <button onClick={goToFavorites} className="btn secondary-btn">Ver Películas Favoritas</button>
                <button onClick={goToWatched} className="btn secondary-btn">Ver Películas Vistas</button>
                <ChangePassword />
            </div>
        </div>
    );
};

export default Profile;