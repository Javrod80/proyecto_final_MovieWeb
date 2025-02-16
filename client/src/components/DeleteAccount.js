import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { useAuth } from "../providers/AuthContext";
import { toast } from "react-toastify";
import useFetch from "../hook/useFetch";

const DeleteAccount = () => {
    const { userId } = useAuth();
    const navigate = useNavigate();
    const { fetchData } = useFetch();
    const [showConfirmation, setShowConfirmation] = useState(false);

    const handleDeleteUser = async () => {
        try {
            if (!userId) {
                throw new Error('No se proporcionó un userId válido.');
            }

            await fetchData(`users/delete-user/${userId}`, 'DELETE', null, localStorage.getItem('token'));

            toast.success('Cuenta eliminada exitosamente');
            navigate('/login');
        } catch (error) {
            console.error('Error al eliminar el usuario:', error);
            toast.error('Error al eliminar el usuario');
        }
    };

    return (
        <div>
            {!showConfirmation ? (
                // Botón inicial para mostrar la confirmación
                <button onClick={() => setShowConfirmation(true)}>
                    Eliminar Cuenta
                </button>
            ) : (
                // Confirmación de eliminación
                <div>
                    <h2>Eliminar Cuenta</h2>
                    <p>¿Estás seguro de eliminar tu cuenta?</p>
                    <button onClick={handleDeleteUser}>Confirmar</button>
                    <button onClick={() => setShowConfirmation(false)}>Cancelar</button>
                </div>
            )}
        </div>
    );
};

export default DeleteAccount;
