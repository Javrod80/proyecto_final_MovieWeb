import React from 'react';
import useFetch from '../hooks/useFetch';
import useFetchAdminData from '../adminHooks/useFetchAdminData';
import useAdminStatus from '../adminHooks/useAdminStatus';
/**
 * Componente para obtener y mostrar los favoritos en el dashboard de administración.
 *
 * Este componente utiliza varios hooks personalizados para obtener el estado de administrador,
 * el estado de carga y los datos de los favoritos desde un endpoint. Solo los administradores pueden ver los favoritos.
 *
 * @component
 * @returns {JSX.Element} El componente de favoritos del dashboard de administración.
 */

const AdminGetFavorites = () => {
  const { isLoading, error } = useFetch(); 
  const { isAdmin } = useAdminStatus();
  const { data: favorites } = useFetchAdminData('admin/get-all-favorites');

  return (
    <div className="container mt-5">
      <h1 className="text-primary text-center mb-4">Admin Dashboard</h1>
      <h2 className="text-success text-center">Favorites Collections</h2>
      {isLoading && <p className="text-warning text-center">Loading...</p>}
      {error && <p className="text-danger text-center">Error: {error}</p>}
      {isAdmin ? (
        favorites.length > 0 ? (
          <div className="row justify-content-center">
            {favorites.map((movie) => (
              <div key={movie._id.imdbID} className="card mb-3 shadow-lg" style={{ maxWidth: '500px' }}>
                <img
                  src={movie._id.Poster}
                  alt={movie._id.Title}
                  className="card-img-top"
                  style={{ height: 'auto', maxHeight: '200px', objectFit: 'cover' }}
                />
                <div className="card-body text-center">
                  <h5 className="card-title text-dark">{movie._id.Title}</h5>
                  <p className="card-text text-muted">Favorited by <span className="text-primary">{movie.count}</span> user(s)</p>
                  <p className="card-text"><span className="text-info">Users:</span> {(movie.users || []).join(', ')}</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-secondary text-center">No favorites found.</p>
        )
      ) : (
        <p className="text-danger text-center">Access denied. You must be an admin to view this page.</p>
      )}
    </div>
  );
};

export default AdminGetFavorites;
