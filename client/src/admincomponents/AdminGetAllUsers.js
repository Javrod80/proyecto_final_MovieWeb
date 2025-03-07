import React from 'react';
import useFetch from '../hooks/useFetch';
import useFetchAdminData from '../adminHooks/useFetchAdminData';
import useAdminStatus from '../adminHooks/useAdminStatus';
/**
 * Componente para obtener y mostrar los usuarios en el dashboard de administración.
 *
 * Este componente utiliza varios hooks personalizados para obtener el estado de administrador,
 * el estado de carga y los datos de los usuarios desde un endpoint. Solo los administradores pueden ver los usuarios.
 *
 * @component
 * @returns {JSX.Element} El componente de usuarios del dashboard de administración.
 */

const AdminGetAllUsers = () => {
    const { isLoading, error } = useFetch(); 
    const { isAdmin } = useAdminStatus();
    const { data: users  } = useFetchAdminData('admin/users/all-data-users');


    return (
        <div className="container mt-4">
            <h2 className="mb-4 text-primary font-weight-bold">Usuarios</h2>
            {isLoading ? (
                <div className="alert alert-info" role="alert">Cargando...</div>
            ) : error ? (
                <div className="alert alert-danger" role="alert">Error: {error}</div>
            ) : isAdmin ? (
                <div className="table-responsive">
                    <table className="table table-striped table-bordered table-hover">
                        <thead className="table-dark">
                            <tr>
                                <th scope="col">ID</th>
                                <th scope="col">Nombre</th>
                                <th scope="col">Apellido</th>
                                <th scope="col">Correo Electrónico</th>
                                <th scope="col">Fecha de Creación</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((user) => (
                                <tr key={user.id} className="table-info">
                                    <td>{user.id}</td>
                                    <td>{user.user_name}</td>
                                    <td>{user.user_lastnames}</td>
                                    <td>{user.email}</td>
                                    <td>{new Date(user.created_at).toLocaleDateString()}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ) : (
                <div className="alert alert-danger" role="alert">Acceso Denegado</div>
            )};

        </div>

    );
};

export default AdminGetAllUsers;