// Formulario para editar las reseñas

import React, { useState } from 'react';



const EditReviewForm = ({ review, onCancel,onSubmit }) => {

    // Estados para los campos del formulario
    const [newRating, setNewRating] = useState(review.rating);
    const [newReview, setNewReview] = useState(review.review);

    // Función para manejar el envío del formulario
    const handleSubmit = async (e) => {
        e.preventDefault();
        const newReviewData = { review: newReview, rating: newRating };
        onSubmit(review._id, newReviewData); // Llama la función onSubmit del componente principal para actualizar
    };
        // Renderizar el formulario
    return (
        <div className="container mt-4 d-flex justify-content-center">
            <div className="card p-4 shadow w-50">
                <h3 className="text-primary text-center">Editar Reseña</h3>
                <form onSubmit={handleSubmit}>
                   
                    <div className="mb-3">
                        <label className="form-label fw-bold">Reseña:</label>
                        <textarea
                            className="form-control form-control-lg text-center"
                            value={newReview}
                            onChange={(e) => setNewReview(e.target.value)}
                            rows="3"
                        />
                    </div>
                 
                    <div className="mb-3">
                        <label className="form-label fw-bold">Calificación:</label>
                        <input
                            type="number"
                            className="form-control form-control-lg text-center"
                            value={newRating}
                            onChange={(e) => setNewRating(e.target.value)}
                            min="1"
                            max="5"
                        />
                    </div>
                   
                    <div className="d-flex justify-content-center gap-3">
                        <button type="submit" className="btn btn-success btn-lg w-50">
                            Actualizar
                        </button>
                        <button type="button" className="btn btn-secondary btn-lg w-50" onClick={onCancel}>
                            Cancelar
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );

};
export default EditReviewForm;