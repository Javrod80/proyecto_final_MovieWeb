import React, { useEffect, useState } from 'react';
import useFetch from '../hook/useFetch';
import { jwtDecode } from 'jwt-decode';

const AdminGetWatchedMovies = () => {
    const { isLoading, error, fetchData } = useFetch();
    const [isAdmin, setIsAdmin] = useState(false);
    const token = localStorage.getItem('token');
    const [watchedMovies, setWatchedMovies] = useState([]);

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
            const fetchMovies = async () => {
                const result = await fetchData('admin/all-movies-watched', 'GET', null, token);
              
                if (result) {
                    setWatchedMovies(result);
                }
            };
            fetchMovies();
        }
    }, [isAdmin, fetchData, token]);

    return (
        <div className="container mt-4">
            <h2 className="mb-4 text-primary font-weight-bold">Películas Vistas</h2>
            {isLoading ? (
                <div className="alert alert-info" role="alert">Cargando...</div>
            ) : error ? (
                <div className="alert alert-danger" role="alert">Error: {error}</div>
            ) : (
                <div className="table-responsive">
                    <table className="table table-striped table-bordered table-hover">
                        <thead className="table-dark">
                            <tr>
                                <th scope="col" style={{ width: '15%' }}>User ID</th>
                                <th scope="col" style={{ width: '25%' }}>Título</th>
                                <th scope="col" style={{ width: '10%' }}>Poster</th>
                                <th scope="col" style={{ width: '15%' }}>Fecha de Visualización</th>
                            </tr>
                        </thead>
                        <tbody>
                            {watchedMovies.map((movie) => (
                                <tr key={movie.id} className="table-info">
                                    <td>{movie.user_id}</td>
                                    <td style={{ maxWidth: '200px', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                        {movie.title}
                                    </td>
                                    <td>
                                        <img
                                            src={movie.poster}
                                            alt={movie.title}
                                            style={{ width: '100px', height: '150px', objectFit: 'cover' }}
                                        />
                                    </td>
                                    <td>{new Date(movie.watched_at).toLocaleDateString()}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );


};

export default AdminGetWatchedMovies;
