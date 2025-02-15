import React, { useState } from 'react';
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

        const token = localStorage.getItem('token');
        if (!token) {
            toast.error('Token no disponible. Por favor, inicie sesión nuevamente.');
            return;
        }
        try {

            await fetchData(
                `http://localhost:5000/movieapp/v1/users/update-user/${userId}`,
                'PUT',
                { password },
                
                    token
                
            );


            if (data) {
                toast.success('Contraseña actualizada con éxito.');
                setPassword('');
                setShowForm(false);
            } else {
                toast.error('Error al actualizar la contraseña.');
            }
        } catch (error) {
            console.error('Error:', error);
            toast.error('Error al actualizar la contraseña');
        }
    };

    return (
        <div className="change-password">
            <button onClick={() => setShowForm(!showForm)}>
                {showForm ? 'Cancelar' : 'Cambiar Contraseña'}
            </button>

            {showForm && (
                <form onSubmit={handleChangePassword}>
                    <label>Nueva Contraseña:</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <button type="submit" disabled={isLoading}>
                        {isLoading ? 'Cargando...' : 'Actualizar'}
                    </button>
                </form>
            )}

            {error && <p style={{ color: 'red' }}>{error}</p>} {/* Mostrar mensaje de error si hay alguno */}
        </div>
    );
};

export default ChangePassword;
