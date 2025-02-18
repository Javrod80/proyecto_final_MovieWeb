import { getDataFromCollection } from './genericMongo.models.js';
import { insertIntoCollection } from './genericMongo.models.js';
import { deleteFromCollection } from './genericMongo.models.js';
import { updateInCollection } from './genericMongo.models.js';
import { ObjectId } from 'bson';
import dotenv from 'dotenv';

dotenv.config();

const collectionName = process.env.COLL_REV;

const crudMongoDBReviews = {

    /**
  * Función específica para obtener reseñas de una película.
  * @async
  * @function getMovieReviews
  * @param {string} movieId - El ID de la película.
  * @returns {Promise<Array>} Devuelve una promesa con las reseñas de la película.
  */

    // Función específica para obtener reseñas de una película
    getMovieReviews: async (movieId) => {
        return getDataFromCollection(collectionName, { movieId });
    },

    /**
     * Función para agregar una reseña de película.
     * @async
     * @function addMovieReview
     * @param {string} userId - El ID del usuario que realiza la reseña.
     * @param {string} movieId - El ID de la película.
     * @param {number} rating - La calificación de la película.
     * @param {string} review - El texto de la reseña.
     * @returns {Promise<Object>} Devuelve una promesa con el resultado de la inserción de la reseña.
     */
    // Función para agregar una reseña de película
    addMovieReview: async (userId, movieId, rating, review) => {
        return insertIntoCollection(collectionName, { userId, movieId, rating, review });
    },

    /**
    * Función para eliminar una reseña de una película.
    * @async
    * @function deleteMovieReview
    * @param {string} reviewId - El ID de la reseña a eliminar.
    * @param {string} userId - El ID del usuario que realizó la reseña.
    * @returns {Promise<Object|null>} Devuelve el resultado de la eliminación de la reseña o null si ocurrió un error.
    */
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

    /**
         * Función para actualizar una reseña de película.
         * @async
         * @function updateMovieReview
         * @param {string} reviewId - El ID de la reseña a actualizar.
         * @param {Object} reviewData - Los nuevos datos de la reseña.
         * @param {number} reviewData.rating - La nueva calificación de la película.
         * @param {string} reviewData.review - El nuevo texto de la reseña.
         * @returns {Promise<Object|null>} Devuelve el resultado de la actualización o null si ocurrió un error.
         * @throws {Error} Lanza un error si los datos son nulos.
         */
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

    /**
     * Función para obtener una reseña por su ID.
     * @async
     * @function getReviewById
     * @param {string} id - El ID de la reseña.
     * @returns {Promise<Object|null>} Devuelve la reseña encontrada o null si ocurre un error.
     */
   
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
