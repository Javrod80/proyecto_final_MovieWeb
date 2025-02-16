import React, { createContext, useContext, useState, useCallback } from 'react';
import useFetch from '../hook/useFetch';

const ReviewsContext = createContext();

export const useReviews = () => useContext(ReviewsContext);

const ReviewsProvider = ({ children }) => {
    const [reviews, setReviews] = useState({});
    const { isLoading, error,  fetchData } = useFetch();

    // Función para obtener reseñas de una película específica
    const fetchReviews = useCallback(async (movieId) => {
        const response = await fetchData(`http://localhost:5000/movieapp/v1/reviews/${movieId}`);
     
        if (response) {
            setReviews(prevReviews => ({
                ...prevReviews,
                [movieId]: response
            }));
        }
    }, [fetchData]);

    // Función para agregar una nueva reseña
    const addReview = useCallback(async (userId, movieId, rating, review) => {
        const body = { userId, movieId, rating, review };
        const response = await fetchData('http://localhost:5000/movieapp/v1/reviews/add-review', 'POST', body);
     
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

    const updateReview = useCallback(async (reviewId, newReviewData) => {
        const token = localStorage.getItem('token');
        const response = await fetchData(`http://localhost:5000/movieapp/v1/reviews/update-review/${reviewId}`, 'PUT', newReviewData, token);
        return response;
    }, [fetchData]);

    const deleteReview = useCallback(async (reviewId, userId, movieId) => {
        const body = { userId, movieId };
        const token = localStorage.getItem('token');
        const response = await fetchData(`http://localhost:5000/movieapp/v1/reviews/delete-review/${reviewId}`, 'DELETE', body, token);
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
