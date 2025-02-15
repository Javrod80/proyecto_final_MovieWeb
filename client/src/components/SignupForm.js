import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import useFetch from "../hook/useFetch";

const SignupForm = () => {
    const [formData, setFormData] = useState({
        user_name: "",
        user_lastnames: "",
        email: "",
        password: ""
    });

    const { isLoading, error, data, fetchData } = useFetch();
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        await fetchData("http://localhost:5000/movieapp/v1/users/signup", "POST", formData);
    };

    
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

    return (
        <div>
            <form onSubmit={handleSubmit} method="POST">
                <div className="divForm">
                    <div>
                        <label htmlFor="user_name">Nombre: </label>
                        <input
                            type="text"
                            id="user_name"
                            placeholder="Enter your name"
                            name="user_name"
                            value={formData.user_name}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div>
                        <label htmlFor="user_lastname">Apellido: </label>
                        <input
                            type="text"
                            id="user_lastname"
                            placeholder="Enter your last name"
                            name="user_lastnames"
                            value={formData.user_lastnames}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div>
                        <label htmlFor="email">Email: </label>
                        <input
                            type="email"
                            id="email"
                            placeholder="Enter your email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div>
                        <label htmlFor="password">Password: </label>
                        <input
                            type="password"
                            id="password"
                            placeholder="Enter your password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    {isLoading && <p>Cargando...</p>}

                    <div className="divBotones In">
                        <button type="submit" className="botonLog" disabled={isLoading}>
                            {isLoading ? "Registrando..." : "REGISTRARSE"}
                        </button>
                    </div>

                    {error && <p style={{ color: "red" }}>{error}</p>}
                </div>
            </form>
        </div>
    );
};

export default SignupForm;
