import React, { useState, useEffect } from "react";
import { useReviews } from "../providers/ReviewsProvider";
import { useAuth } from "../providers/AuthContext";
import EditReviewForm from "./EditReviewForm";
import { toast } from "react-toastify";

const Reviews = ({ movieId }) => {
    const { reviews, fetchReviews, addReview, updateReview, deleteReview, isLoading, error } = useReviews();
    const [reviewText, setReviewText] = useState("");
    const { userId } = useAuth();
    const [rating, setRating] = useState(5);
    const [editingReview, setEditingReview] = useState(null);

    useEffect(() => {
        if (movieId) {
            fetchReviews(movieId); // Cargar reseñas de la película
        }
    }, [movieId, fetchReviews]);

    const handleReviewSubmit = async (event) => {
        event.preventDefault();

        if (!userId) {
            toast.error("Debes iniciar sesión para agregar una reseña.");
            return;
        }
        if (!reviewText.trim()) return; // Evitar reseñas vacías

         await addReview(userId, movieId, rating, reviewText);
        setRating(5);
        setReviewText("");
        fetchReviews(movieId)
        
    };

    const handleEditReview = async (reviewId, newReviewData) => {
        const response = await updateReview(reviewId, newReviewData);
        if (response) {
            fetchReviews(movieId);
            setEditingReview(null);
        }
    };

    const handleDeleteReview = async (reviewId) => {
        const response = await deleteReview(reviewId, userId, movieId);
        if (response) {
            fetchReviews(movieId);
        }
    };

    // Función para renderizar las estrellas
    const renderStars = (rating) => {
        return [...Array(5)].map((_, i) => (i < rating ? '★' : '☆')).join('');
    };

  
    return (
        <div>
            <h3>Reseñas</h3>
            {isLoading ? (
                <p>Cargando reseñas...</p>
            ) : error ? (
                <p>Error al cargar reseñas: {error}</p>
            ) : (
                <>
                    {reviews[movieId]?.length > 0 ? (
                        reviews[movieId].map((review) => (
                            <div key={review._id}>
                                <p><strong>Review: </strong>{review.review}</p>
                                <p><strong>Puntuación: </strong>{renderStars(review.rating)}</p>
                                {review.userId === userId && (
                                    <>
                                        <button onClick={() => setEditingReview(review)}>Editar</button>
                                        <button onClick={() => handleDeleteReview(review._id)}>Eliminar</button>
                                    </>
                                )}
                            </div>
                        ))
                    ) : (
                        <p>No hay reseñas aún.</p>
                    )}
                    {editingReview && (
                        <EditReviewForm
                            review={editingReview}
                            onCancel={() => setEditingReview(null)}
                            onSubmit={handleEditReview}
                        />
                    )}
                    <form onSubmit={handleReviewSubmit}>
                        <select value={rating} onChange={(e) => setRating(Number(e.target.value))}>
                            <option value={1}>⭐ 1</option>
                            <option value={2}>⭐ 2</option>
                            <option value={3}>⭐ 3</option>
                            <option value={4}>⭐ 4</option>
                            <option value={5}>⭐ 5</option>
                        </select>
                        <input
                            type="text"
                            value={reviewText}
                            onChange={(e) => setReviewText(e.target.value)}
                            placeholder="Escribe tu reseña..."
                        />
                        <button type="submit">Agregar</button>
                    </form>
                </>
            )}
        </div>
    );
};

export default Reviews;
