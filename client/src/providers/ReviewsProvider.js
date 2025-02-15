import React, { createContext, useContext, useState, useCallback } from 'react';

const ReviewsContext = createContext();

export const useReviews = () => useContext(ReviewsContext);

const ReviewsProvider = ({ children }) => {
    const [reviews, setReviews] = useState({});

    // Función para obtener reseñas de una película específica
    const fetchReviews = useCallback(async (movieId) => {
        try {
            const response = await fetch(`http://localhost:5000/movieapp/v1/reviews/${movieId}`);
            const data = await response.json();
            //console.log("Reseñas obtenidas:", data);

            setReviews(prevReviews => ({
                ...prevReviews,
                [movieId]: data 
            }));
        } catch (error) {
            console.error('Error al obtener las reseñas:', error);
        }
    }, []);

    // Función para agregar una nueva reseña
    const addReview = async (userId, movieId, rating, review) => {
        try {
            const response = await fetch('http://localhost:5000/movieapp/v1/reviews/add-review', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ userId, movieId, rating, review }),
            });
            const result = await response.json();

            if (result.insertedId) {
                const newReview = { _id: result.insertedId, userId, movieId, rating, review };

                setReviews(prevReviews => {
                    const updatedReviews = prevReviews[movieId] ? [...prevReviews[movieId], newReview] : [newReview];
                    console.log("Reseñas actualizadas:", updatedReviews);
                    return {
                        ...prevReviews,
                        [movieId]: updatedReviews
                    };
                });

                return newReview; // Retorna la reseña agregada
            }
            return null;
        } catch (error) {
            console.error('Error al agregar la reseña:', error);
            return null;
        }
    };
    const updateReview = async (reviewId, newReviewData) => {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`http://localhost:5000/movieapp/v1/reviews/update-review/${reviewId}`, {
                method: 'PUT',
                headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' },
                body: JSON.stringify(newReviewData),

            });
            console.log(token)
            const result = await response.json();
            return result; // Retorna el resultado de la actualización
        } catch (error) {
            console.error('Error al actualizar la reseña:', error);
            return null;
        }
    };

    const deleteReview = async (reviewId, userId, movieId) => {
        try {
            const response = await fetch(`http://localhost:5000/movieapp/v1/reviews/delete-review/${reviewId}`, {
                method: 'DELETE',
                headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` },
                body: JSON.stringify({ userId, movieId }),
            });
            if (!response.ok) {
                throw new Error("Error al eliminar la reseña");
            }

            // Actualizar el estado después de eliminar la reseña
            fetchReviews(movieId);
        } catch (error) {
            console.error(error);
        }
    };


    return (
        <ReviewsContext.Provider value={{ reviews, fetchReviews, addReview, updateReview, deleteReview }}>
            {children}
        </ReviewsContext.Provider>
    );
};

export { ReviewsProvider, ReviewsContext };