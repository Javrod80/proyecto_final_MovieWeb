import React, { createContext, useContext, useEffect, useState } from 'react';
import { useSearch } from './SearchProvider';

const ReviewsContext = createContext();

export const useReviews = () => {
    return useContext(ReviewsContext);
};


const ReviewsProvider = ({ children }) => {
    const [reviews, setReviews] = useState([]);
  
    const { movieId } = useSearch(); // Obtener el ID de la película desde el contexto de busqueda

    useEffect(() => {
        if (movieId) {
            fetchReviews(movieId);
        }
    }, [movieId]);

    const fetchReviews = async (movieId) => {
        try {
            const response = await fetch(`http://localhost:5000/movieapp/v1/reviews/${movieId}`);
            const data = await response.json();
            setReviews(data);
        } catch (error) {
            console.error('Error al obtener las reseñas:', error);
        }
    };

    const addReview = async (userId, movieId, rating, review) => {
        try {
            const response = await fetch('http://localhost:5000/movieapp/v1/reviews/add-review', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ userId, movieId, rating, review }),
            });
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error al agregar la reseña:', error);
            return null;
        }
    };

    return (
        <ReviewsContext.Provider value={{ reviews, fetchReviews, addReview }}>
            {children}
        </ReviewsContext.Provider>
    );
};

export { ReviewsProvider, ReviewsContext };