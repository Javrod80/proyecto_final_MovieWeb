// Formulario para registrar un nuevo usuario
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import useFetch from "../hook/useFetch";

const SignupForm = () => {
    // Datos del formulario
    const [formData, setFormData] = useState({
        user_name: "",
        user_lastnames: "",
        email: "",
        password: ""
    });

    const { isLoading, error, data, fetchData } = useFetch();
    const navigate = useNavigate();
    // Manejar los cambios en el formulario
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };
    // Enviar el formulario
    const handleSubmit = async (e) => {
        e.preventDefault();
        await fetchData("users/signup", "POST", formData);
    };

    // Manejar los cambios en el formulario
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
    // Renderizar el formulario
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
