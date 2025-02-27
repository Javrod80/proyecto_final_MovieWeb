import React, { useEffect, useState } from 'react';
import useFetch from '../hook/useFetch';



const AdminGetFavorites = () => {
  const [favorites, setFavorites] = useState([]);
  const { isLoading, error,  fetchData } = useFetch();

  useEffect(() => {
      const fetchFavorites = async () => {
          const result = await fetchData('admin/get-all-favorites');
          if (result) {
              setFavorites(result);
          }
      };
      fetchFavorites();
  }, [fetchData]);

  return (
    <div>
      <h1>Admin Dashboard</h1>
      <h2>Favorites Collections</h2>
      {isLoading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      {favorites.length > 0 ? (
        favorites.map((movie) => (
          <div key={movie._id.imdbID} className="card mb-3" style={{ maxWidth: '500px', margin: 'auto', top: '40px' }}>
            <img
              src={movie._id.Poster}
              alt={movie._id.Title}
              className="card-img-top"
              style={{ height: 'auto', maxHeight: '200px', objectFit: 'cover' }}
            />
            <div className="card-body text-center">
              <h5 className="card-title">{movie._id.Title}</h5>
              <p className="card-text">Favorited by {movie.count} user(s)</p>
              <p className="card-text">Users: {(movie.users || []).join(', ')}</p>
            </div>
          </div>
        ))
      ) : (
        <p>No favorites found.</p>
      )}
    </div>
  );
};

export default AdminGetFavorites;