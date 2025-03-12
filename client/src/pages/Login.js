import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../providers/AuthContext";
import { toast } from "react-toastify";
import useFetch from "../hooks/useFetch";
import { jwtDecode } from "jwt-decode";
/**
 * Componente de Login que permite a los usuarios iniciar sesión en la aplicación.
 * Si el inicio de sesión es exitoso, el usuario es redirigido a una página diferente dependiendo de su rol.
 *
 * @component
 * @returns {JSX.Element} El formulario de inicio de sesión.
 */
const Login = () => {
    /**
 * Hook para obtener la función de autenticación del contexto de usuario.
 * @function login
 */
    const { login } = useAuth();
    /**
  * Hook para la navegación entre páginas.
  * @function navigate
  */
    const navigate = useNavigate();
    /**
 * Hook para manejar el estado de la solicitud de datos.
 * @type {Object}
 * @property {boolean} isLoading - Indica si la solicitud está en proceso.
 * @property {string|null} error - Mensaje de error si ocurre alguno.
 * @property {Object|null} data - Datos de la respuesta, que incluye el token de autenticación.
 * @property {Function} fetchData - Función para hacer solicitudes HTTP.
 */
    const { isLoading, error, data, fetchData } = useFetch();
    /**
    * Estado para verificar si el usuario ya ha iniciado sesión.
    * @type {boolean}
    */
    const [hasLoggedIn, setHasLoggedIn] = useState(false);
    /**
     * Manejador de envío del formulario de inicio de sesión.
     * Hace una solicitud POST para autenticar al usuario.
     * 
     * @async
     * @function handleSubmit
     * @param {React.FormEvent} e - El evento de envío del formulario.
     */
    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const email = formData.get("email");
        const password = formData.get("password");

        await fetchData("users/login", "POST", { email, password });
    };
    /**
      * Efecto que se ejecuta cuando la respuesta de la solicitud de inicio de sesión llega.
      * Si la autenticación es exitosa, guarda el token y el rol del usuario en el almacenamiento local
      * y redirige al usuario según su rol.
      * 
      * @effect
      */
    useEffect(() => {
        if (error) {
            toast.error(error);
        }

        if (data && data.token && !hasLoggedIn) {
            toast.success(data.message || "Operación exitosa");

            localStorage.setItem("token", data.token);
            localStorage.setItem("userId", data.user?.id);

            const decodedToken = jwtDecode(data.token);
            const userRole = decodedToken.rol; 

            localStorage.setItem("rol", userRole); 
           
            login(data.user?.id, userRole);
            
        
            // Redirigir según el rol
            navigate(userRole === "admin" ? "/admin-dashboard" : "/search");
            setHasLoggedIn(true);
        }
    }, [data, error, navigate, login, hasLoggedIn]);


    return (
        <div className="container mt-5" style={{ paddingTop: '100px' }}>
            <div className="row justify-content-center">
                <div className="col-md-4">
                    <div className="card shadow-lg" style={{ borderRadius: '15px', backgroundColor: '#f8f9fa' }}>
                        <div className="card-body">
                            <h2 className="text-center mb-4">Iniciar sesión</h2>
                            <form onSubmit={handleSubmit} method="POST">
                                <div className="form-group mb-3">
                                    <label htmlFor="email">Email:</label>
                                    <input
                                        type="email"
                                        id="email"
                                        className="form-control"
                                        placeholder="Ingresa tu email"
                                        name="email"
                                        required
                                    />
                                </div>
                                <div className="form-group mb-3">
                                    <label htmlFor="password">Contraseña:</label>
                                    <input
                                        type="password"
                                        id="password"
                                        className="form-control"
                                        placeholder="Ingresa tu contraseña"
                                        name="password"
                                        required
                                    />
                                </div>

                                <div className="text-center mb-3">
                                    <button type="submit" className="btn btn-primary" disabled={isLoading}>
                                        {isLoading ? "Cargando..." : "Iniciar sesión"}
                                    </button>
                                </div>
                            </form>

                            {error && <div className="alert alert-danger mt-3">{error}</div>}

                            <div className="text-center mt-3">
                                <button
                                    className="btn btn-link"
                                    onClick={() => navigate("/recovery-password")}
                                >
                                    ¿Olvidaste tu contraseña?
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
