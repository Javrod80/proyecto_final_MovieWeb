import { getDataFromCollection } from './genericMongo.models.js';
import { insertIntoCollection } from './genericMongo.models.js';
import { deleteFromCollection } from './genericMongo.models.js';
import { updateInCollection } from './genericMongo.models.js';
import dotenv from 'dotenv';
dotenv.config();

const collectionName = process.env.COLL_FAV;

const crudMongoDB = {
    /**
  * Agrega una película a los favoritos de un usuario.
  * @async
  * @function insertFavorites
  * @param {string} userId - El ID del usuario.
  * @param {Object} movie - El objeto de la película a agregar.
  * @returns {Promise<Object>} Devuelve el resultado de la inserción en la base de datos.
  */
    // Función para agregar una película a favoritos
    insertFavorites: async (userId, movie) => {
        return insertIntoCollection(collectionName, { userId, ...movie });
    },


    /**
     * Obtiene las películas favoritas de un usuario específico.
     * @async
     * @function getFavorites
     * @param {string} userId - El ID del usuario.
     * @returns {Promise<Array>} Devuelve un arreglo con las películas favoritas del usuario.
     */
    // Función específica para obtener favoritos de un usuario
    getFavorites: async (userId) => {
        return getDataFromCollection(collectionName, { userId });
    },

    /**
  * Elimina una película de los favoritos de un usuario.
  * @async
  * @function deleteFavorite
  * @param {string} userId - El ID del usuario.
  * @param {string} movieId - El ID de la película a eliminar.
  * @returns {Promise<Object>} Devuelve el resultado de la eliminación en la base de datos.
  */
    // Función para eliminar una película de favoritos
    deleteFavorite: async (userId, movieId) => {
        return deleteFromCollection(collectionName, { userId, imdbID: movieId });
    },
    /**
   * Actualiza los datos de una película en los favoritos de un usuario.
   * @async
   * @function updateFavorite
   * @param {string} userId - El ID del usuario.
   * @param {string} movieId - El ID de la película a actualizar.
   * @param {Object} newFavoriteData - Los nuevos datos de la película.
   * @returns {Promise<Object>} Devuelve el resultado de la actualización en la base de datos.
   */

    // Función para actualizar una película en favoritos (ejemplo)
    updateFavorite: async (userId, movieId, newFavoriteData) => {
        return updateInCollection('favorites', { userId, id: movieId }, newFavoriteData);
    }
};

export default crudMongoDB;
