import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from "../providers/AuthContext";
import { toast } from 'react-toastify';

const Login = () => {
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const email = formData.get('email');
        const password = formData.get('password');

        try {
            const response = await fetch("http://127.0.0.1:5000/movieapp/v1/users/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, password }), // Enviar email y password
            });

            const data = await response.json();
            console.log('Response data:', data); // Verificar los datos de la respuesta

            if (!response.ok) {
                throw new Error(data.message || `Error en la solicitud: ${response.statusText}`);
            }

            // Mostrar mensaje de éxito
            toast.success(data.message || "Operación exitosa");

            // Almacenar el token en localStorage
            localStorage.setItem('token', data.token);

          
            login();

            // Redirigir a la página de búsqueda después del login exitoso
            navigate('/search');
        } catch (error) {
            console.error("Error:", error);
            alert(error.message || "Ocurrió un error");
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit} method="POST">
                <div className='divForm'>
                    <div>
                        <label htmlFor="email">Email: </label>
                        <input
                            type="email"
                            id="email"
                            aria-describedby="emailHelp"
                            placeholder="Enter your email"
                            name="email"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="password">Password: </label>
                        <input
                            type="password"
                            id="password"
                            aria-describedby="emailHelp"
                            placeholder="Enter your password"
                            name="password"
                            required
                        />
                    </div>

                    <div className='divBotones In'>
                        <button
                            type="submit"
                            className="botonLog"
                        >
                            LOGIN
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default Login;
