/**
 * Componente de la página de inicio de sesión.
 * 
 * Permite a los usuarios iniciar sesión en la aplicación. Solicita un correo electrónico y una contraseña, 
 * y si las credenciales son correctas, guarda un token en el almacenamiento local y redirige al usuario a la página de búsqueda.
 * 
 * @component
 * @example
 * return <Login />;
 * 
 * @returns {JSX.Element} Renderiza la interfaz de inicio de sesión con campos para ingresar email y contraseña.
 */

import React, { useEffect , useState} from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../providers/AuthContext";
import { toast } from "react-toastify";
import useFetch from "../hook/useFetch";

/**
    * Función que maneja el envío del formulario de inicio de sesión.
    * Realiza una solicitud para autenticar al usuario con las credenciales proporcionadas.
    * 
    * @param {React.FormEvent} e - El evento de envío del formulario.
    * @returns {void}
    */
const Login = () => {
    const { login } = useAuth();
    const navigate = useNavigate();
    const { isLoading, error, data, fetchData } = useFetch();
    const [hasLoggedIn, setHasLoggedIn] = useState(false);

    // Manejar el envío del formulario
    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const email = formData.get("email");
        const password = formData.get("password");

        await fetchData("users/login", "POST", { email, password });
    };

    useEffect(() => {
        if (error) {
            toast.error(error);
        }
        // Verificar si el token está disponible en el almacenamiento local

        if (data && data.token && !hasLoggedIn) {
            toast.success(data.message || "Operación exitosa");

            localStorage.setItem("token", data.token);
            localStorage.setItem("userId", data.user?.id);
            // Actualizar el estado de autenticación
            login(data.user?.id);
            navigate("/search");
            setHasLoggedIn(true);
        }
    }, [data, error, navigate, login, hasLoggedIn]);
    // Renderizar el formulario
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
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
