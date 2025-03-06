import React, { useEffect, useState } from 'react';
import useFetch from '../hook/useFetch';
import { jwtDecode } from 'jwt-decode';

const AdminGetAllUsers = () => {
    const { isLoading, error, fetchData } = useFetch();
    const [isAdmin, setIsAdmin] = useState(false);
    const token = localStorage.getItem('token');
    const [users, setUsers] = useState([]);
     useEffect(() => {
        if (token) {
          const decodedToken = jwtDecode(token);
          if (decodedToken.rol === 'admin') {
            setIsAdmin(true);
          }
        }
      }, [token]);

      useEffect(() => {
          if (isAdmin) {
            
            const fetchUsers = async () => {
                const result = await fetchData('admin/users/all-data-users', 'GET', null, token);
      
              if (result) {
                setUsers(result);
              }
            };
            fetchUsers();
          }
        }, [isAdmin, fetchData, token]);

    return (
        <div className="container mt-4">
            <h2 className="mb-4 text-primary font-weight-bold">Usuarios</h2>
            {isLoading ? (
                <div className="alert alert-info" role="alert">Cargando...</div>
            ) : error ? (
                <div className="alert alert-danger" role="alert">Error: {error}</div>
            ) : (
                <div className="table-responsive">
                    <table className="table table-striped table-bordered table-hover">
                        <thead className="table-dark">
                            <tr>
                                <th scope="col">Nombre</th>
                                <th scope="col">Apellido</th>
                                <th scope="col">Correo Electrónico</th>
                                <th scope="col">Fecha de Creación</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((user) => (
                                <tr key={user.id} className="table-info">
                                    <td>{user.user_name}</td>
                                    <td>{user.user_lastnames}</td>
                                    <td>{user.email}</td>
                                    <td>{new Date(user.created_at).toLocaleDateString()}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default AdminGetAllUsers;