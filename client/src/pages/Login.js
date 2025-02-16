import React, { useEffect , useState} from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../providers/AuthContext";
import { toast } from "react-toastify";
import useFetch from "../hook/useFetch";

const Login = () => {
    const { login } = useAuth();
    const navigate = useNavigate();
    const { isLoading, error, data, fetchData } = useFetch();
    const [hasLoggedIn, setHasLoggedIn] = useState(false);

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

        if (data && data.token && !hasLoggedIn) {
            toast.success(data.message || "Operación exitosa");

            localStorage.setItem("token", data.token);
            localStorage.setItem("userId", data.user?.id);

            login(data.user?.id);
            navigate("/search");
            setHasLoggedIn(true);
        }
    }, [data, error, navigate, login, hasLoggedIn]);

    return (
        <div>
            <form onSubmit={handleSubmit} method="POST">
                <div className="divForm">
                    <div>
                        <label htmlFor="email">Email: </label>
                        <input type="email" id="email" placeholder="Enter your email" name="email" required />
                    </div>
                    <div>
                        <label htmlFor="password">Password: </label>
                        <input type="password" id="password" placeholder="Enter your password" name="password" required />
                    </div>

                    <div className="divBotones In">
                        <button type="submit" className="botonLog" disabled={isLoading}>
                            {isLoading ? "Cargando..." : "LOGIN"}
                        </button>
                    </div>
                </div>
            </form>

            {error && <p>{error}</p>}
        </div>
    );
};

export default Login;
