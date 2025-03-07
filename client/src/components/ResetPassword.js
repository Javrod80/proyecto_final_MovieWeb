import React, { useState } from 'react';
import { useAuth } from '../providers/AuthContext';
import { toast } from 'react-toastify';
import useFetch from '../hooks/useFetch';
/**
 * Componente para restablecer la contraseña.
 *
 * Este componente permite a los usuarios solicitar un correo electrónico para restablecer su contraseña.
 *
 * @component
 * @returns {JSX.Element} El componente de restablecimiento de contraseña.
 */
const ResetPassword = () => {
    const { userId } = useAuth();
    const { isLoading, error, fetchData } = useFetch();
    const [loading, setLoading] = useState(false);

    const handleRequestReset = async () => {
        
        if (!userId ) {
            toast.error('No se encontró un usuario válido.');
            return;
        }

        const token = localStorage.getItem('token');
        if (!token) {
            toast.error('Token no disponible. Por favor, inicia sesión nuevamente.');
            return;
        }

        setLoading(true);
        try {
            const response = await fetchData('users/reset-password', 'POST', {  userId }, token);

            if (response) {
                toast.success('Se ha enviado un correo con el enlace para restablecer tu contraseña.');
            }
        } catch (error) {
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container mt-3">
            <h4>Cambiar Contraseña</h4>
            <p>Se enviará un correo con un enlace para cambiar tu contraseña.</p>
            {error && <p className="text-danger">{error}</p>}
            <button className="btn btn-primary" onClick={handleRequestReset} disabled={loading || isLoading}>
                {loading || isLoading ? 'Enviando...' : 'Enviar correo cambio de contraseña'}
            </button>
        </div>
    );
};

export default ResetPassword;
