import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import useFetch from '../hook/useFetch';

const ChangePassword = () => {
    const [searchParams] = useSearchParams();
    const token = searchParams.get('token');
    const [password, setPassword] = useState('');
    const [showForm, setShowForm] = useState(true);
    const { isLoading, error, data, fetchData } = useFetch();

    const validatePassword = (password) => {
        if (password.length < 8) {
            return "La contraseña debe tener al menos 8 caracteres.";
        }
        if (!/[A-Z]/.test(password)) {
            return "La contraseña debe contener al menos una letra mayúscula.";
        }
        if (!/[0-9]/.test(password)) {
            return "La contraseña debe contener al menos un número.";
        }
        return null;
    };

    const handleChangePassword = async (e) => {
        e.preventDefault();

        const validationError = validatePassword(password);
        if (validationError) {
            toast.error(validationError);
            return;
        }
        console.log('Token recibido en frontend:', token);
        if (!token) {
            toast.error('Token no válido o expirado.');
            return;
        }

        await fetchData(
            `users/new-password`,
            'PUT',
            { password },
            {
                headers: {
                    
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                }
            }
        );
    };

    useEffect(() => {
        if (data) {
            toast.success('Contraseña actualizada con éxito.');
            setPassword('');
            setShowForm(false);
        } else if (error) {
            toast.error(error.message || 'Error al actualizar la contraseña.');
        }
    }, [data, error]);

    return (
        <div className="container d-flex justify-content-center align-items-center" style={{ minHeight: '80vh' }}>
            {showForm ? (
                <form className="w-50 p-3 border rounded shadow-sm bg-light" onSubmit={handleChangePassword}>
                    <h5 className="text-center mb-3">Cambiar Contraseña</h5>
                    <div className="mb-2">
                        <label className="form-label small">Nueva Contraseña:</label>
                        <input
                            type="password"
                            className="form-control form-control-sm"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <div className="d-flex justify-content-center">
                        <button type="submit" className="btn btn-success btn-sm w-100" disabled={isLoading}>
                            {isLoading ? "Cargando..." : "Actualizar"}
                        </button>
                    </div>
                </form>
            ) : (
                <p className="text-success text-center">Tu contraseña ha sido cambiada con éxito.</p>
            )}

            {error && <div className="alert alert-danger mt-2 text-center small">{error.message}</div>}
        </div>
    );
};

export default ChangePassword;
