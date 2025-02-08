import { getDataFromCollection } from './genericCrud.js';
import { insertIntoCollection } from './genericCrud.js';
import { deleteFromCollection } from './genericCrud.js';
import { updateInCollection } from './genericCrud.js';

const collectionName = process.env.COLL_REV;

const crudMongoDBReviews = {

    // Función específica para obtener reseñas de una película
    getMovieReviews: async (movieId) => {
        return getDataFromCollection(collectionName, { movieId });
    },

    // Función para agregar una reseña de película
    addMovieReview: async (userId, movieId, rating, review) => {
        return insertIntoCollection(collectionName, { userId, movieId, rating, review });
    },

    // Función para eliminar una reseña de una película
    deleteMovieReview: async (userId, movieId) => {
        return deleteFromCollection(collectionName, { userId, movieId });
    },

    // Función para actualizar una reseña de película
    updateMovieReview: async (userId, movieId, newReviewData) => {
        return updateInCollection('reviews', { userId, movieId }, newReviewData);
    }

};

export default crudMongoDBReviews;
