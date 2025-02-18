/**
 * Componente de la página de inicio de la aplicación Movie Finder.
 * 
 * Muestra un mensaje de bienvenida, una breve descripción del propósito de la aplicación
 * y dos botones para redirigir al usuario a las páginas de inicio de sesión o registro.
 * 
 * @component
 * @example
 * return <Home />;
 * 
 * @returns {JSX.Element} Renderiza la interfaz de la página de inicio con dos botones
 * para iniciar sesión o registrarse.
 */

import React from "react";
import { useNavigate } from "react-router-dom"; 


const Home = () => {
    const navigate = useNavigate(); 


    /**
        * Función para navegar a la página de inicio de sesión.
        * Redirige al usuario a la ruta '/login'.
        * 
        * @returns {void}
        */
    const gotoLogin = () => {
        navigate('/login'); 
    };
    /**
   * Función para navegar a la página de registro.
   * Redirige al usuario a la ruta '/register'.
   * 
   * @returns {void}
   */
    const gotoRegister = () => {
        navigate('/register'); 
    }
    // Renderizar la página de inicio
    return (
        <div className="container mt-4 pt-5"> 
            <div className="card mx-auto shadow-lg mt-5" style={{ maxWidth: '800px', borderRadius: '20px', backgroundColor: '#f8f9fa' }}>
                <div className="card-body text-center"> 
                    <h1 className="display-4" style={{ color: '#343a40' }}>Bienvenido a Movie Finder</h1>
                    <p className="lead" style={{ fontSize: '1.25rem' }}>Encuentra información sobre tus películas favoritas en un solo clic.</p>
                </div>
            </div>

            <div className="card mx-auto shadow-lg mt-5" style={{ maxWidth: '800px', borderRadius: '20px', backgroundColor: '#f8f9fa' }}>
                <div className="card-body text-center">
                    <p className="card-text mb-4" style={{ fontSize: '1.1rem' }}>
                        ¿Listo para encontrar tu próxima película para ver? <br />
                        Busca el título de cualquier película y accede a detalles como su sinopsis, elenco y más.
                    </p>

                    <div className="home-buttons mt-4">
                        <h2 className="mb-3">¡Comienza ahora!</h2>
                        <button onClick={gotoLogin} className="btn btn-primary mx-2">
                            Iniciar Sesión
                        </button>
                        <button onClick={gotoRegister} className="btn btn-secondary mx-2">
                            Registrarse
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );

};

export default Home;