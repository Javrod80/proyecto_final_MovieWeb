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
        const action = formData.get('action');
        const username = formData.get('username');
        const password = formData.get('password');

        try {
            const response = await fetch("http://127.0.0.1:5000/movieapp/v1/users/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ action, username, password }),
            });

            const data = await response.json();
            console.log('Response data:', data); // Verificar los datos de la respuesta

            if (!response.ok) {
                throw new Error(`Error en la solicitud: ${response.statusText}`);
            }

            // Mostrar mensaje de éxito
            toast.success(data.message || "Operación exitosa");

            if (action === 'login') {
                login();  // Llamar al login para actualizar el estado
                // Si el login es exitoso, redirigir a la página de búsqueda
                navigate('/search');
            } else {
                navigate('/login');
            }
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
                        <label htmlFor="username">Username: </label>
                        <input
                            type="text"
                            id="username"
                            aria-describedby="emailHelp"
                            placeholder="Enter your username"
                            name="username"
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

                    <input type="hidden" name="action" value="signup" />
                    <div className='divBotones In'>
                        <button
                            type="submit"
                            className="botonLog"
                            onClick={() => (document.querySelector('[name="action"]').value = 'signup')}
                        >
                            SIGNUP
                        </button>
                        <button
                            type="submit"
                            className="botonLog"
                            onClick={() => (document.querySelector('[name="action"]').value = 'login')}
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