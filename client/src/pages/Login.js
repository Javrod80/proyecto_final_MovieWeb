import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from "../providers/AuthContext";
import { toast } from 'react-toastify';
import useFetch from '../hook/useFetch'; 

const Login = () => {
    const { login } = useAuth();
    const navigate = useNavigate();

   
    const { isLoading, error, data, fetchData } = useFetch();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const email = formData.get('email');
        const password = formData.get('password');

        try {
            
            await fetchData("http://127.0.0.1:5000/movieapp/v1/users/login", 'POST', { email, password });

            
            if (data && data.token) {
               
                toast.success(data.message || "Operación exitosa");

          
                localStorage.setItem('token', data.token);
                localStorage.setItem('userId', data.user?.id);
             //   console.log("UserID guardado en localStorage:", localStorage.getItem('userId'));

                login(data.user?.id); 

                
                navigate('/search');
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
                            disabled={isLoading} // Deshabilitar el botón mientras está cargando
                        >
                            {isLoading ? 'Cargando...' : 'LOGIN'}
                        </button>
                    </div>
                </div>
            </form>

            {error && <p >{error}</p>}
        </div>
    );
};

export default Login;
