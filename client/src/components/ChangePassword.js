// Formulario para cambiar la contraseña
import React, { useState, useEffect } from 'react';
import { useAuth } from '../providers/AuthContext';
import { toast } from 'react-toastify';
import useFetch from '../hook/useFetch';

const ChangePassword = () => {
    const { userId } = useAuth();
    const [password, setPassword] = useState('');
    const [showForm, setShowForm] = useState(false);

    const { isLoading, error, data, fetchData } = useFetch();

    const handleChangePassword = async (e) => {
        e.preventDefault();

        if (!password) {
            toast.error('La contraseña no puede estar vacía.');
            return;
        }
        // Verificar si hay un token en el almacenamiento local
        const token = localStorage.getItem('token');
        if (!token) {
            toast.error('Token no disponible. Por favor, inicie sesión nuevamente.');
            return;
        }
        // Llamar a la API para cambiar la contraseña
        await fetchData(
            `users/update-user/${userId}`,
            'PUT',
            { password },
            token
        );
    };
    // Manejar la actualización de la contraseña

    useEffect(() => {
        if (data) {
            toast.success('Contraseña actualizada con éxito.');
            setPassword('');
            setShowForm(false);
        } else if (error) {
            toast.error('Error al actualizar la contraseña.');
        }
    }, [data, error]);
    // Renderizar el formulario
    return (
        <div className="container mt-3">
            <button
                className="btn btn-primary btn-sm"  // Botón más pequeño
                onClick={() => setShowForm(!showForm)}
            >
                {showForm ? "Cancelar" : "Cambiar Contraseña"}
            </button>

            {showForm && (
                <form className="mt-2 p-3 border rounded shadow-sm" onSubmit={handleChangePassword}>
                    <div className="mb-2">
                        <label className="form-label fs-6">Nueva Contraseña:</label>
                        <input
                            type="password"
                            className="form-control form-control-sm"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit" className="btn btn-success btn-sm" disabled={isLoading}>
                        {isLoading ? "Cargando..." : "Actualizar"}
                    </button>
                </form>
            )}

            {error && <div className="alert alert-danger mt-2" style={{ fontSize: '0.9rem' }}>{error}</div>}
        </div>
    );
};

export default ChangePassword;
