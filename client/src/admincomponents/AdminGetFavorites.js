import React, { useEffect, useState } from 'react';
import useFetch from '../hook/useFetch';
import { jwtDecode } from 'jwt-decode';
/**
 * AdminGetFavorites es un componente que muestra una lista de películas favoritas
 * de los usuarios. Este componente solo es accesible para los administradores.
 * 
 * @component
 * @returns {JSX.Element} El componente de administración para ver las películas favoritas.
 */

const AdminGetFavorites = () => {
  /**
  * Estado para almacenar las películas favoritas obtenidas de la API.
  * @type {Array}
  */
  const [favorites, setFavorites] = useState([]);
  /**
  * Estados para manejar el estado de carga, el error y la función para obtener datos.
  * @type {Object}
  * @property {boolean} isLoading - Indica si los datos están siendo cargados.
  * @property {string|null} error - El mensaje de error, si ocurre alguno.
  * @property {Function} fetchData - Función para hacer solicitudes HTTP.
  */
  const { isLoading, error, fetchData } = useFetch();
  /**
 * Estado que indica si el usuario tiene privilegios de administrador.
 * @type {boolean}
 */
  const [isAdmin, setIsAdmin] = useState(false);
  /**
    * Token obtenido del almacenamiento local.
    * @type {string|null}
    */
  const token = localStorage.getItem('token');
  /**
  * Efecto que se ejecuta una vez al cargar el componente y valida si el usuario es un administrador.
  * Si el token es válido y el rol es 'admin', establece el estado de isAdmin a true.
  * 
  * 
  */
  useEffect(() => {
    if (token) {
      const decodedToken = jwtDecode(token);
      if (decodedToken.rol === 'admin') {
        setIsAdmin(true);
      }
    }
  }, [token]);
  /**
    * Este efecto se ejecuta cuando isAdmin es true y realiza una petición para obtener
    * todas las películas favoritas de los usuarios. Los resultados se almacenan en el estado `favorites`.
    */
  useEffect(() => {
    if (isAdmin) {
      /**
        * Función asincrónica para obtener las películas favoritas.
        * Llama a la función fetchData para hacer una solicitud GET.
        * 
        * @async
        * @function fetchFavorites
        * @returns {Promise<void>}
        */
      const fetchFavorites = async () => {
        const result = await fetchData('admin/get-all-favorites', 'GET', null, token);

        if (result) {
          setFavorites(result);
        }
      };
      fetchFavorites();
    }
  }, [isAdmin, fetchData, token]);

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
