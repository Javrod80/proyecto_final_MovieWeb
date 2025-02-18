/**
 * Componente para el registro de un nuevo usuario.
 * Este formulario permite a un usuario registrar su cuenta proporcionando su nombre, apellido, email y contraseña.
 *
 * @component
 * @example
 * return (
 *   <SignupForm />
 * );
 */
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import useFetch from "../hook/useFetch";

const SignupForm = () => {
    /**
    * Datos del formulario que incluyen nombre, apellido, email y contraseña.
    * @type {Object}
    * @property {string} user_name - Nombre del usuario.
    * @property {string} user_lastnames - Apellido del usuario.
    * @property {string} email - Correo electrónico del usuario.
    * @property {string} password - Contraseña del usuario.
    */
    const [formData, setFormData] = useState({
        user_name: "",
        user_lastnames: "",
        email: "",
        password: ""
    });

    const { isLoading, error, data, fetchData } = useFetch();
    const navigate = useNavigate();
    /**
     * Maneja los cambios en los campos del formulario.
     * Actualiza el estado `formData` con los nuevos valores.
     * 
     * @param {Object} e - El evento del formulario.
     * @param {string} e.target.name - Nombre del campo que cambió.
     * @param {string} e.target.value - Valor del campo que cambió.
     */
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };
    /**
    * Maneja el envío del formulario.
    * Realiza una petición POST al endpoint de registro de usuario y muestra un mensaje de éxito o error.
    * 
    * @param {Object} e - El evento de envío del formulario.
    */
    const handleSubmit = async (e) => {
        e.preventDefault();
        await fetchData("users/signup", "POST", formData);
    };
    /**
       * Efecto secundario para manejar los datos y errores de la respuesta de la API.
       * Si la respuesta es exitosa, muestra un mensaje de éxito y redirige al usuario a la página de login.
       */
    useEffect(() => {
        if (error) {
            toast.error(error);
        }

        if (data) {
            toast.success("Usuario registrado con éxito 🎉");
            setFormData({ user_name: "", user_lastnames: "", email: "", password: "" });
            setTimeout(() => navigate("/login"), 2000);
        }
    }, [data, error, navigate]);
    /**
    * Renderiza el formulario de registro.
    * Muestra un formulario con campos para nombre, apellido, email y contraseña.
    * También maneja el estado de carga y los mensajes de error.
    *
    * @returns {JSX.Element} Formulario de registro de usuario.
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
                                        value={formData.password}
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
