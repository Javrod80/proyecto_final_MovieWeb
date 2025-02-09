import React, { useState } from 'react';



const EditReviewForm = ({ review, onCancel,onSubmit }) => {
    const [newRating, setNewRating] = useState(review.rating);
    const [newReview, setNewReview] = useState(review.review);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newReviewData = { review: newReview, rating: newRating };
        onSubmit(review._id, newReviewData); // Llama la función onSubmit del componente principal para actualizar
    };
        

    return (
        <form onSubmit={handleSubmit}>
            <textarea
                value={newReview}
                onChange={(e) => setNewReview(e.target.value)}
            />
            <input
                type="number"
                value={newRating}
                onChange={(e) => setNewRating(e.target.value)}
            />
            <button type="submit">Actualizar</button>
            <button type="button" onClick={onCancel}>Cancelar</button>
        </form>
    );
};
export default EditReviewForm;