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
        try {
            const objectId = new ObjectId(reviewId);
            const result = await deleteFromCollection(collectionName, { _id: objectId, userId: userId });
            return result;
        } catch (error) {
            console.error("Error al crear ObjectId:", error);
            return null;
        }
        
    },


    // Función para actualizar una reseña de película
    updateMovieReview: async (reviewId, { rating, review }) => {
        if (rating === null || review === null) {
            throw new Error("No se pueden actualizar con valores nulos");
        }
        try {
            const objectId = new ObjectId(reviewId);
            return await updateInCollection(collectionName, { _id: objectId }, { rating, review });
        } catch (error) {
            console.error("Error al crear ObjectId:", error);
            return null;
        }
       
    },

   
    getReviewById: async (id) => {
        try {
            const objectId = new ObjectId(id);
            return await getDataFromCollection(collectionName, { _id: objectId });
        } catch (error) {
            console.error("Error al crear ObjectId:", error);
            return null;
        }
    }
   
};



export default crudMongoDBReviews;
