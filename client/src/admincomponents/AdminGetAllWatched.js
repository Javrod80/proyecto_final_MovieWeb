import React from 'react';
import useFetch from '../hooks/useFetch';
import useFetchAdminData from '../adminHooks/useFetchAdminData';
import useAdminStatus from '../adminHooks/useAdminStatus';
/**
 * Componente para obtener y mostrar las películas vistas en el dashboard de administración.
 *
 * Este componente utiliza varios hooks personalizados para obtener el estado de administrador,
 * el estado de carga y los datos de las películas vistas desde un endpoint. Solo los administradores pueden ver las películas vistas.
 *
 * @component
 * @returns {JSX.Element} El componente de películas vistas del dashboard de administración.
 */
const AdminGetWatchedMovies = () => {
    const { isLoading, error } = useFetch(); 
    const { isAdmin } = useAdminStatus();
    const { data: watchedMovies } = useFetchAdminData('admin/all-movies-watched');

   

    return (
        <div className="container mt-4">
          <h2 className="mb-4 text-primary font-weight-bold">Películas Vistas</h2>
          {isLoading ? (
            <div className="alert alert-info" role="alert">Cargando...</div>
          ) : error ? (
            <div className="alert alert-danger" role="alert">Error: {error}</div>
          ) : isAdmin ? (
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
                  {Array.isArray(watchedMovies) && watchedMovies.length > 0 ? (
                    watchedMovies.map((movie) => (
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
                    ))
                  ) : (
                    <tr>
                      <td colSpan="4" className="text-center">No se encontraron películas vistas.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="text-danger text-center">No tienes permisos de administrador.</p>
          )}
        </div>
      );    


};

export default AdminGetWatchedMovies;
