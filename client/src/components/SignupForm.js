import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';

const SignupForm = () => {
    const [formData, setFormData] = useState({
        user_name: "",
        user_lastnames: "",
        email: "",
        password: ""
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch("http://localhost:5000/movieapp/v1/users/signup", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (response.ok) {
                toast.success("Usuario registrado con éxito 🎉");
                setFormData({ user_name: "", user_lastname: "", email: "", password: "" });
                setTimeout(() => {
                    navigate("/login");
                }, 2000);
            } else {
                toast.error(data.message || "Error al registrar usuario");
            }
        } catch (error) {
            console.error("Error en el registro:", error);
            toast.error("Error en la conexión con el servidor");
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit} method="POST">
                <div className='divForm'>
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
                            value={formData.user_lastname}
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

                    <div className='divBotones In'>
                        <button type="submit" className="botonLog">
                            REGISTRARSE
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default SignupForm;
