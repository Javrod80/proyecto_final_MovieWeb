/**
 * Componente para visualizar, agregar, editar y eliminar reseñas de una película.
 * 
 * Este componente muestra una lista de reseñas de una película, permitiendo al usuario agregar nuevas reseñas, 
 * editar las reseñas que ha hecho previamente y eliminar sus reseñas. También muestra las reseñas de otros usuarios 
 * y su puntuación en estrellas.
 * 
 * @component
 * @param {Object} props - Propiedades del componente.
 * @param {string} props.movieId - El ID de la película para la cual se gestionan las reseñas.
 * @example
 * return (
 *   <Reviews movieId="12345" />
 * )
 */
import React, { useState, useEffect } from "react";
import { useReviews } from "../providers/ReviewsProvider";
import { useAuth } from "../providers/AuthContext";
import EditReviewForm from "./EditReviewForm";
import { toast } from "react-toastify";

const Reviews = ({ movieId }) => {
    /**
     * Accede a las funciones y datos del contexto de reseñas.
     * @type {Object}
     */
    const { reviews, fetchReviews, addReview, updateReview, deleteReview, isLoading, error } = useReviews();
    /**
   * Estado para el texto de la reseña.
   * @type {string}
   */
    const [reviewText, setReviewText] = useState("");
    /**
    * Accede al ID del usuario desde el contexto de autenticación.
    * @type {string}
    */
    const { userId } = useAuth();
    /**
    * Estado para la puntuación de la reseña.
    * @type {number}
    */
    const [rating, setRating] = useState(5);

    /**
     * Estado para controlar la reseña que se está editando.
     * @type {Object|null}
     */
    const [editingReview, setEditingReview] = useState(null);

    useEffect(() => {
        if (movieId) {
            fetchReviews(movieId); // Cargar reseñas de la película
        }
    }, [movieId, fetchReviews]);

    /**
    * Maneja el envío de una nueva reseña.
    * 
    * @param {Object} event - El evento de envío del formulario.
    * @returns {void}
    */
    const handleReviewSubmit = async (event) => {
        event.preventDefault();

        if (!userId) {
            toast.error("Debes iniciar sesión para agregar una reseña.");
            return;
        }
        if (!reviewText.trim()) return; // Evitar reseñas vacías
        // Agregar la reseña
         await addReview(userId, movieId, rating, reviewText);
        setRating(5);
        setReviewText("");
        fetchReviews(movieId)
        
    };
    /**
     * Maneja la edición de una reseña existente.
     * 
     * @param {string} reviewId - El ID de la reseña a editar.
     * @param {Object} newReviewData - Los nuevos datos de la reseña.
     * @returns {void}
     */
    const handleEditReview = async (reviewId, newReviewData) => {
        const response = await updateReview(reviewId, newReviewData);
        if (response) {
            fetchReviews(movieId);
            setEditingReview(null);
        }
    };

    /**
     * Maneja la eliminación de una reseña.
     * 
     * @param {string} reviewId - El ID de la reseña a eliminar.
     * @returns {void}
     */
    const handleDeleteReview = async (reviewId) => {
        const response = await deleteReview(reviewId, userId, movieId);
        if (response) {
            fetchReviews(movieId);
        }
    };

    /**
      * Renderiza las estrellas en función de la puntuación.
      * 
      * @param {number} rating - La puntuación de la reseña.
      * @returns {string} Una cadena con las estrellas correspondientes.
      */
    const renderStars = (rating) => {
        return [...Array(5)].map((_, i) => (i < rating ? '★' : '☆')).join('');
    };

  
    return (
        <div>
            <h3 className="mb-3">Reseñas</h3> 
            {isLoading ? (
                <p>Cargando reseñas...</p>
            ) : error ? (
                <p className="text-danger">Error al cargar reseñas: {error}</p>
            ) : (
                <>
                    {reviews[movieId]?.length > 0 ? (
                        reviews[movieId].map((review) => (
                            <div key={review._id} className="mb-3 p-2 border rounded" style={{ fontSize: '0.9rem' }}>
                                <p><strong>Review: </strong>{review.review}</p>
                                <p><strong>Puntuación: </strong>{renderStars(review.rating)}</p>
                                {review.userId === userId && (
                                    <div className="d-flex gap-2">
                                        <button
                                            className="btn btn-warning btn-sm"
                                            onClick={() => setEditingReview(review)}
                                        >
                                            Editar
                                        </button>
                                        <button
                                            className="btn btn-danger btn-sm"
                                            onClick={() => handleDeleteReview(review._id)}
                                        >
                                            Eliminar
                                        </button>
                                    </div>
                                )}
                            </div>
                        ))
                    ) : (
                        <p>No hay reseñas aún.</p>
                    )}
                    {/* Formulario para editar una reseña */}
                    {editingReview && (
                        <EditReviewForm
                            review={editingReview}
                            onCancel={() => setEditingReview(null)}
                            onSubmit={handleEditReview}
                        />
                    )}
                    {/* Formulario para agregar una reseña */}
                    <form onSubmit={handleReviewSubmit} className="mt-3">
                        <div className="form-group mb-2">
                            <label htmlFor="rating">Puntuación:</label>
                            <select
                                id="rating"
                                className="form-control form-control-sm" 
                                value={rating}
                                onChange={(e) => setRating(Number(e.target.value))}
                            >
                                <option value={1}>⭐ 1</option>
                                <option value={2}>⭐ 2</option>
                                <option value={3}>⭐ 3</option>
                                <option value={4}>⭐ 4</option>
                                <option value={5}>⭐ 5</option>
                            </select>
                        </div>
                        <div className="form-group mb-2">
                            <label htmlFor="reviewText">Escribe tu reseña:</label>
                            <input
                                id="reviewText"
                                type="text"
                                className="form-control form-control-sm" 
                                value={reviewText}
                                onChange={(e) => setReviewText(e.target.value)}
                                placeholder="Escribe tu reseña..."
                            />
                        </div>
                        <button type="submit" className="btn btn-primary btn-sm"> 
                            Agregar Reseña
                        </button>
                    </form>
                </>
            )}
        </div>
    );

};

export default Reviews;
