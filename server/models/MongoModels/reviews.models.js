import { getDataFromCollection } from './genericMongo.models.js';
import { insertIntoCollection } from './genericMongo.models.js';
import { deleteFromCollection } from './genericMongo.models.js';
import { updateInCollection } from './genericMongo.models.js';
import { ObjectId } from 'bson';
import dotenv from 'dotenv';

dotenv.config();

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
    deleteMovieReview: async (reviewId, userId) => {
        const objectId = new ObjectId(reviewId);
        return await deleteFromCollection(collectionName, { _id: objectId, userId });
    },


    // Función para actualizar una reseña de película
    updateMovieReview: async (reviewId, { rating, review }) => {
        const objectId = new ObjectId(reviewId);
        return await updateInCollection(collectionName, { _id: objectId }, { rating, review });
    },

   
    getReviewById: async (id) => {
        const objectId = new ObjectId(id);
        return getDataFromCollection(collectionName, { _id: objectId });
    },



};

export default crudMongoDBReviews;
