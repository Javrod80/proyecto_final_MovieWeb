/**
 * Proveedor del contexto de reseñas para gestionar las reseñas de películas.
 * 
 * Este componente proporciona un contexto para manejar las reseñas de películas en la aplicación.
 * Ofrece funciones para agregar, eliminar, actualizar y obtener reseñas de una película específica.
 * El estado de las reseñas se mantiene en un objeto, donde la clave es el ID de la película y el valor es un array de reseñas asociadas a esa película.
 * 
 * @component
 * @example
 * 
 * <ReviewsProvider>
 *   <App />
 * </ReviewsProvider>
 * 
 * @returns {JSX.Element} El proveedor de contexto que envuelve el árbol de componentes.
 */
import React, { createContext, useContext, useState, useCallback } from 'react';
import useFetch from '../hook/useFetch';

const ReviewsContext = createContext();
/**
 * Hook personalizado para acceder al contexto de reseñas.
 * 
 * Este hook proporciona el estado de las reseñas de películas y las funciones necesarias para gestionarlas.
 * 
 * @returns {Object} El contexto de reseñas con el estado y las funciones necesarias.
 * @property {Object} reviews - Un objeto donde la clave es el ID de la película y el valor es un array de reseñas de esa película.
 * @property {Function} fetchReviews - Función para obtener las reseñas de una película específica.
 * @property {Function} addReview - Función para agregar una nueva reseña.
 * @property {Function} updateReview - Función para actualizar una reseña existente.
 * @property {Function} deleteReview - Función para eliminar una reseña.
 * @property {boolean} isLoading - Estado de carga para saber si se están recuperando las reseñas.
 * @property {string} error - Error que puede ocurrir al realizar las operaciones de reseñas.
 */
export const useReviews = () => useContext(ReviewsContext);
/**
 * Proveedor que maneja el estado de las reseñas de películas en la aplicación.
 * 
 * Este proveedor proporciona funciones para agregar, eliminar, actualizar y obtener reseñas de una película.
 * El estado de las reseñas se mantiene en un objeto que está relacionado con las películas por su ID.
 * 
 * @component
 * @example
 * 
 * <ReviewsProvider>
 *   <App />
 * </ReviewsProvider>
 * 
 * @param {Object} props - Props que se pasan al componente.
 * @param {JSX.Element} props.children - Los componentes hijos que están envueltos por el proveedor.
 * 
 * @returns {JSX.Element} El proveedor de contexto de reseñas que envuelve los componentes hijos.
 */
const ReviewsProvider = ({ children }) => {
    const [reviews, setReviews] = useState({});
    const { isLoading, error, fetchData } = useFetch();

    /**
     * Función para obtener las reseñas de una película específica desde la API.
     * 
     * @param {string} movieId - El ID de la película para la cual se obtendrán las reseñas.
     */
    const fetchReviews = useCallback(async (movieId) => {
        const response = await fetchData(`reviews/${movieId}`);

        if (response) {
            setReviews(prevReviews => ({
                ...prevReviews,
                [movieId]: response
            }));
        }
    }, [fetchData]);

    /**
    * Función para agregar una nueva reseña para una película.
    * 
    * @param {string} userId - El ID del usuario que está agregando la reseña.
    * @param {string} movieId - El ID de la película para la cual se agregará la reseña.
    * @param {number} rating - La calificación de la película (de 1 a 5).
    * @param {string} review - El texto de la reseña.
    * 
    * @returns {Object|null} La nueva reseña agregada si fue exitosa, o null si no se pudo agregar.
    */
    const addReview = useCallback(async (userId, movieId, rating, review) => {
        const body = { userId, movieId, rating, review };
        const response = await fetchData('reviews/add-review', 'POST', body);

        if (response && response.insertedId) {
            const newReview = { _id: response.insertedId, userId, movieId, rating, review };
            setReviews(prevReviews => {
                const updatedReviews = prevReviews[movieId] ? [...prevReviews[movieId], newReview] : [newReview];
                return {
                    ...prevReviews,
                    [movieId]: updatedReviews
                };
            });
            return newReview;
        }
        return null;
    }, [fetchData]);
    /**
     * Función para actualizar una reseña existente.
     * 
     * @param {string} reviewId - El ID de la reseña que se desea actualizar.
     * @param {Object} newReviewData - Los nuevos datos de la reseña.
     * 
     * @returns {Object|null} La reseña actualizada si la actualización fue exitosa, o null si no se pudo actualizar.
     */
    const updateReview = useCallback(async (reviewId, newReviewData) => {
        const token = localStorage.getItem('token');
        const response = await fetchData(`reviews/update-review/${reviewId}`, 'PUT', newReviewData, token);
        return response;
    }, [fetchData]);
    /**
    * Función para eliminar una reseña.
    * 
    * @param {string} reviewId - El ID de la reseña que se desea eliminar.
    * @param {string} userId - El ID del usuario que está eliminando la reseña.
    * @param {string} movieId - El ID de la película asociada a la reseña.
    */
    const deleteReview = useCallback(async (reviewId, userId, movieId) => {
        const body = { userId, movieId };
        const token = localStorage.getItem('token');
        const response = await fetchData(`reviews/delete-review/${reviewId}`, 'DELETE', body, token);
        if (response) {
            fetchReviews(movieId);
        }
    }, [fetchData, fetchReviews]);

    return (
        <ReviewsContext.Provider value={{ reviews, fetchReviews, addReview, updateReview, deleteReview, isLoading, error }}>
            {children}
        </ReviewsContext.Provider>
    );
};

export { ReviewsProvider, ReviewsContext };
