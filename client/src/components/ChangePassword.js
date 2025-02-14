import React, { useState } from 'react';
import { useAuth } from '../providers/AuthContext';
import { toast } from 'react-toastify';

const ChangePassword = () => {
    const { userId } = useAuth();
    const [password, setPassword] = useState('');
    const [showForm, setShowForm] = useState(false);

    const handleChangePassword = async (e) => {
        e.preventDefault();

        if (!password) {
            toast.error('La contraseña no puede estar vacía.');
            return;
        }

        try {
            const response = await fetch(`http://localhost:5000/movieapp/v1/users/update-user/${userId}`,  {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                },
                body: JSON.stringify({ password }),
            });

            const data = await response.json();
            if (response.ok) {
                toast.success('Contraseña actualizada con éxito.');
                setPassword(''); 
                setShowForm(false); 
            } else {
                toast.error(data.message || 'Error al actualizar la contraseña.');
            }

        } catch (error) {
            console.error('Error:', error);
            setMessage('Error al actualizar la contraseña');
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
                    <button type="submit">Actualizar</button>
                </form>
            )}
        </div>
    );
};

export default ChangePassword;
