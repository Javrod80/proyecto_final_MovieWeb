import React, { useState, useEffect } from 'react';
import useFetch from '../hook/useFetch';
import { jwtDecode } from 'jwt-decode';
/**
 * Componente que muestra las reseñas de películas. Solo accesible por administradores.
 * Muestra un listado de reseñas agrupadas por película.
 *
 * @component
 * @returns {JSX.Element} El componente de reseñas del administrador.
 */
const AdminGetReviews = () => {
    /**
     * Estado para almacenar las reseñas obtenidas de la API.
     * @type {Array}
     */
    const [reviews, setReviews] = useState([]);
    /**
    * Hook personalizado que maneja el estado de la carga, el error y la función para obtener los datos.
    * @type {Object}
    * @property {boolean} isLoading - Estado que indica si los datos están cargando.
    * @property {string|null} error - Mensaje de error si ocurrió alguno.
    * @property {Function} fetchData - Función para hacer solicitudes HTTP.
    */
    const { isLoading, error, fetchData } = useFetch();
    /**
    * Estado que indica si el usuario es un administrador.
    * @type {boolean}
    */
    const [isAdmin, setIsAdmin] = useState(false);
    /**
        * Token obtenido de localStorage.
        * @type {string|null}
        */
   
    const token = localStorage.getItem('token');
    /**
   * Efecto que se ejecuta al montar el componente y al cambiar el token.
   * Decodifica el token y establece el estado de isAdmin si el rol es 'admin'.
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
        * Efecto que se ejecuta cuando isAdmin y token cambian.
        * Si el usuario es un administrador, realiza una solicitud a la API 
        * para obtener todas las reseñas y las almacena en el estado 'reviews'.
        */
    useEffect(() => {
        if (isAdmin && token) {
            /**
           * Función asincrónica para obtener las reseñas de la API.
           * @async
           * @function fetchReviews
           * @returns {Promise<void>}
           */
            const fetchReviews = async () => {
                const result = await fetchData('admin/get-all-reviews', 'GET', null, token);
                if (result) {
                    setReviews(result);
                }
            };
            fetchReviews();
        }
    }, [isAdmin, fetchData, token]); 

    return (
        <div className="container mt-5">
            <h1 className="text-primary text-center mb-4">Admin Dashboard</h1>
            <h2 className="text-success text-center">Reviews Collections</h2>
            {isLoading && <p className="text-warning text-center">Loading...</p>}
            {error && <p className="text-danger text-center">Error: {error}</p>}
            {reviews.length > 0 ? (
                <div className="row justify-content-center">
                    {reviews.map((reviewGroup) => (
                        <div key={reviewGroup._id.movieId} className="card mb-3 shadow-lg" style={{ maxWidth: '500px' }}>
                            <div className="card-body text-center">
                                <h5 className="card-title text-dark">Movie ID: {reviewGroup._id.movieId}</h5>
                                <p className="card-text text-muted">Total Reviews: <span className="text-primary">{reviewGroup.count}</span></p>
                                {reviewGroup.reviews.map((review, index) => (
                                    <div key={index} className="card mb-3 shadow-sm" style={{ maxWidth: '450px', margin: 'auto' }}>
                                        <div className="card-body">
                                            <p className="card-text"><span className="text-info">User ID:</span> {review.userId}</p>
                                            <p className="card-text"><span className="text-warning">Rating:</span> {review.rating}</p>
                                            <p className="card-text text-muted">Review: {review.review}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <p className="text-secondary text-center">No reviews found.</p>
            )}
        </div>
    );
};

export default AdminGetReviews;
