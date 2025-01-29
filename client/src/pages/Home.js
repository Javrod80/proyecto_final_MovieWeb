import React from "react";
import { useNavigate } from "react-router-dom"; // Hook para navegar entre rutas


const Home = () => {
    const navigate = useNavigate(); // Hook para navegación



    const gotoLogin = () => {
        navigate('/login'); // Navegar a la página de login
    };
    const gotoRegister = () => {
        navigate('/register'); // Navegar a la página de registro
    }
    return (
        <div className="home">
            <header className="home-header">

                <p>Encuentra información sobre tus películas favoritas en un solo clic.</p>
            </header>

            <div className="home-content">
                <p>
                    ¿Listo para encontrar tu próxima película para ver? <br />Busca el título de cualquier película
                    y accede a detalles como su sinopsis, elenco y más.
                </p>
                <div className="home-buttons" >
                    <h2>¡Comienza ahora!</h2>
                    <button onClick={gotoLogin} className="btn tertiary-btn">Iniciar Sesion</button>
                    <button onClick={gotoRegister} className="btn cuaternary-btn">Registrarse</button>
                </div>
            </div>
        </div>
    );
};

export default Home;