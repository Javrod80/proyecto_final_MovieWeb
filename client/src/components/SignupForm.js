import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import useFetch from "../hook/useFetch";
import usePasswordValidation from "../hook/usePasswordValidation";

/**
 * Componente de formulario para el registro de nuevos usuarios.
 * Este formulario permite a los usuarios registrarse ingresando su información personal y una contraseña válida.
 *
 * @component
 * @example
 * return (
 *   <SignupForm />
 * );
 */
const SignupForm = () => {
    const { password, setPassword, validateAndHandleError } = usePasswordValidation(); // Hook para manejar la validación de contraseñas
    const [formData, setFormData] = useState({
        user_name: "",
        user_lastnames: "",
        email: ""
    }); // Estado para los datos del formulario

    const { isLoading, error, data, fetchData } = useFetch(); // Hook personalizado para manejar solicitudes HTTP
    const navigate = useNavigate(); // Hook para redirigir a otras rutas

    /**
     * Maneja los cambios en los campos del formulario y actualiza el estado correspondiente.
     * Si el campo es "password", actualiza el estado manejado por el hook de validación.
     *
     * @param {Object} e - Evento del formulario.
     * @param {string} e.target.name - Nombre del campo que cambió.
     * @param {string} e.target.value - Valor del campo que cambió.
     */
    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === "password") {
            setPassword(value); // Actualiza la contraseña en el hook de validación
        } else {
            setFormData({
                ...formData,
                [name]: value // Actualiza otros datos del formulario
            });
        }
    };

    /**
     * Maneja el envío del formulario. Valida la contraseña antes de enviar los datos al servidor.
     *
     * @param {Object} e - Evento de envío del formulario.
     * @returns {void}
     */
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validar la contraseña usando el hook de validación
        if (!validateAndHandleError()) {
            return; // Detiene el envío si la validación de contraseña falla
        }

        // Preparar los datos para enviarlos al servidor
        const finalData = { ...formData, password };

        await fetchData("users/signup", "POST", finalData); // Enviar solicitud al servidor
    };

    /**
     * Efecto secundario que reacciona a los cambios en los datos de la solicitud.
     * Muestra mensajes de éxito o error según la respuesta del servidor y redirige al usuario en caso de éxito.
     */
    useEffect(() => {
        if (error) {
            toast.error(error); // Mostrar mensaje de error si ocurre
        }

        if (data) {
            toast.success("Usuario registrado con éxito 🎉"); // Mostrar mensaje de éxito
            setFormData({ user_name: "", user_lastnames: "", email: "" }); // Limpiar datos del formulario
            setPassword(""); // Restablecer el estado de la contraseña
            setTimeout(() => navigate("/login"), 2000); // Redirigir al usuario a la página de inicio de sesión
        }
    }, [data, error, navigate, setPassword]);

    /**
     * Renderiza el formulario de registro de usuario.
     * Incluye campos para nombre, apellidos, email y contraseña.
     *
     * @returns {JSX.Element} Formulario de registro.
     */
    return (
        <div className="container mt-12"> 
            <div className="row justify-content-center">
                <div className="col-md-4">
                    <div className="card shadow-lg" style={{ borderRadius: '15px', backgroundColor: '#f8f9fa' }}>
                        <div className="card-body">
                            <h2 className="text-center mb-4">Registro</h2>
                            <form onSubmit={handleSubmit} method="POST">
                                <div className="mb-3">
                                    <label htmlFor="user_name" className="form-label">Nombre:</label>
                                    <input
                                        type="text"
                                        id="user_name"
                                        className="form-control"
                                        placeholder="Ingrese su nombre"
                                        name="user_name"
                                        value={formData.user_name}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="user_lastnames" className="form-label">Apellido:</label>
                                    <input
                                        type="text"
                                        id="user_lastnames"
                                        className="form-control"
                                        placeholder="Ingrese su apellido"
                                        name="user_lastnames"
                                        value={formData.user_lastnames}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="email" className="form-label">Email:</label>
                                    <input
                                        type="email"
                                        id="email"
                                        className="form-control"
                                        placeholder="Ingrese su email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="password" className="form-label">Contraseña:</label>
                                    <input
                                        type="password"
                                        id="password"
                                        className="form-control"
                                        placeholder="Ingrese su contraseña"
                                        name="password"
                                        value={password}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>

                                {isLoading && <p>Cargando...</p>}

                                <div className="mb-3">
                                    <button type="submit" className="btn btn-primary w-100" disabled={isLoading}>
                                        {isLoading ? "Registrando..." : "REGISTRARSE"}
                                    </button>
                                </div>

                                {error && <p className="text-danger">{error}</p>}
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignupForm;
