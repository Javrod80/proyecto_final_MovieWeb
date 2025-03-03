import React, { useState , useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import peliculasImage from '../images/peliculas96.png';
import UploadForm from './UploadForm'; 
import DeleteAccount from './DeleteAccount';
import ResetPassword from './ResetPassword';
import useFetch from '../hook/useFetch';
import { jwtDecode } from 'jwt-decode';

const Profile = () => {
    const navigate = useNavigate();
    const [profileImage, setProfileImage] = useState(null); 
    const { fetchData, error } = useFetch();

    useEffect(() => {
        const fetchProfileImage = async () => {
            const token = localStorage.getItem('token');
            console.log("Token id obtenido:", token);

            // Decodificar el token y extraer el userId
            const decodedToken = jwtDecode(token);
            const userId = decodedToken.id; 
            console.log("userId obtenido:", userId);

            const result = await fetchData("users/profile-image", "GET", null, token);

            if (result) {
                console.log("Imagen obtenida:", result.imagePath);
                setProfileImage(`${userId}/${result.imagePath}`);

               
             
            }
        };

        fetchProfileImage();
    }, [fetchData]);

    if (error) {
        console.error("Error al obtener la imagen de perfil:", error);
    }

    const goToFavorites = () => {
        navigate('/favorites');
    };

    const goToWatched = () => {
        navigate('/watched');
    };

    const handleImageUpload = (imagePath) => {
        setProfileImage(imagePath);
    };

    console.log("Imagen obtenida:", profileImage);
    return (
        <div className="container mt-4">
            <div className="card p-3" style={{ maxWidth: '600px', margin: 'auto', top: '80px' }}>
                <div className="card-body text-center">
                    <h2 className="mb-3">Perfil de Usuario</h2>
                    <p className="mb-3">Aquí podrás ver tus películas favoritas y vistas.</p>
                    
                    <img
                        src={profileImage ? `http://localhost:5000${profileImage}` : peliculasImage} 
                        alt="Imagen de perfil"
                        className="img-fluid mb-3"
                        style={{ maxWidth: "250px", borderRadius: "50%" }}
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
