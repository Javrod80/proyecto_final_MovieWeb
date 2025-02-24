/**
 * Componente para eliminar la cuenta de usuario.
 * Muestra un botón para iniciar la eliminación y una confirmación antes de proceder.
 */
import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { useAuth } from "../providers/AuthContext";
import { toast } from "react-toastify";
import useFetch from "../hook/useFetch";

/**
 * Componente funcional para manejar la eliminación de la cuenta de usuario.
 * @returns {JSX.Element} Formulario de eliminación de cuenta.
 */
const DeleteAccount = () => {
    /** 
     * @type {string}
     */
    const { userId } = useAuth();
    const navigate = useNavigate();
    const { fetchData } = useFetch();
    const [showConfirmation, setShowConfirmation] = useState(false);

    /**
      * Maneja la eliminación de la cuenta del usuario.
      * Realiza una petición a la API para eliminar la cuenta y redirige al login si tiene éxito.
      * @async
      * @function
      */
    const handleDeleteUser = async () => {
        try {
            if (!userId) {
                throw new Error('No se proporcionó un userId válido.');
            }

            await fetchData(`users/delete-user/${userId}`, 'DELETE', null, localStorage.getItem('token'));

            localStorage.removeItem('token');

            toast.success('Cuenta eliminada exitosamente');
            navigate('/login');
        } catch (error) {
            console.error('Error al eliminar el usuario:', error);
            toast.error('Error al eliminar el usuario');
        }
    };
    // Renderizar el formulario
    return (
        <div className="container mt-4 text-center">
            {!showConfirmation ? (

                <button className="btn btn-danger" onClick={() => setShowConfirmation(true)}>
                    Eliminar Cuenta
                </button>
            ) : (

                <div className="card p-4 mt-3 shadow">
                    <h2 className="text-danger">Eliminar Cuenta</h2>
                    <p className="fw-bold">¿Estás seguro de que quieres eliminar tu cuenta?</p>
                    <div className="d-flex justify-content-center gap-3">
                        <button className="btn btn-danger" onClick={handleDeleteUser}>
                            Confirmar
                        </button>
                        <button className="btn btn-secondary" onClick={() => setShowConfirmation(false)}>
                            Cancelar
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default DeleteAccount;
