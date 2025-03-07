import React, { useState } from "react";
import { toast } from "react-toastify";
import useFetch from "../hooks/useFetch";
import { useNavigate } from "react-router-dom";
/**
 * Componente para la recuperación de contraseña.
 *
 * Este componente permite a los usuarios solicitar un correo electrónico para restablecer su contraseña.
 *
 * @component
 * @returns {JSX.Element} El componente de recuperación de contraseña.
 */
const RecoveryPassword = () => {
    const [email, setEmail] = useState("");
    const { isLoading, error, fetchData } = useFetch();
    const navigate = useNavigate();

 /**
   * Manejar el envío del formulario para la recuperación de contraseña.
   *
   * @param {React.FormEvent} e - El evento de envío del formulario.
   */

    const handleForgotPassword = async (e) => {
        e.preventDefault();
        if (!email) {
            toast.error("Por favor ingresa tu correo electrónico.");
            return;
        }

        try {
            const response = await fetchData("users/recovery-mail", "POST", { email });
            if (response) {
                toast.success("Te hemos enviado un correo para restablecer tu contraseña.");
            }
            setTimeout(() => {
                navigate("/login");
            }, 2000);
        
        } catch (err) {
            toast.error(err.message);
        }
    };

    return (
        <div className="container d-flex justify-content-center align-items-center" style={{ minHeight: "100vh" }}>
            <div className="card shadow p-4" style={{ maxWidth: "400px", width: "100%", marginTop: "80px" }}>
                <div className="card-body">
                    <h4 className="card-title text-center mb-4">Olvidaste tu Contraseña</h4>
                    <form onSubmit={handleForgotPassword}>
                        <div className="mb-3">
                            <label htmlFor="email" className="form-label">Correo Electrónico:</label>
                            <input
                                type="email"
                                id="email"
                                className="form-control"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                        <button type="submit" className="btn btn-primary w-100" disabled={isLoading}>
                            {isLoading ? "Enviando..." : "Enviar Correo de Restablecimiento"}
                        </button>
                    </form>
                    {error && <div className="alert alert-danger mt-3">{error}</div>}
                </div>
            </div>
        </div>
    );
};

export default RecoveryPassword;
