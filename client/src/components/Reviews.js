import React, { useState, useEffect } from "react";
import { useReviews } from "../providers/ReviewsProvider";
import { useAuth } from "../providers/AuthContext";

const Reviews = ({ movieId }) => {
    const { reviews, fetchReviews, addReview } = useReviews();
    const [reviewText, setReviewText] = useState("");
    const { userId } = useAuth();
    const [rating, setRating] = useState(5);

    useEffect(() => {
        if (movieId) {
            fetchReviews(movieId); // Cargar reseñas de la película
        }
    }, [movieId]);

    const handleReviewSubmit = async (event) => {
        event.preventDefault();

        if (!userId) {
            alert("Debes iniciar sesión para agregar una reseña.");
            return;
        }
        if (!reviewText.trim()) return; // Evitar reseñas vacías
      

        const response = await addReview(userId, movieId,rating, reviewText);
        if (response) {
            setReviewText(""); // Limpiar el campo después de agregar la reseña
            setRating(5);
            fetchReviews(movieId); // Recargar reseñas después de agregar una nueva
        }
    };

    return (
        <div>
            <h3>Reseñas</h3>
            {reviews.length > 0 ? (
                reviews.map((review) => (
                    <div key={review._id}>
                        <p><strong>{review.userId}:</strong> {review.review}</p>
                    </div>
                ))
            ) : (
                <p>No hay reseñas aún.</p>
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
        </div>
    );
};

export default Reviews;
