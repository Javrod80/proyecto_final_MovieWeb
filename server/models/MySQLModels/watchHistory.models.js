import crudMySQL,{ executeQuery } from './genericMySQL.models.js';
import dotenv from 'dotenv';
dotenv.config();

const tableName = process.env.TAB_SECOND;

/**
 * Modelo de operaciones CRUD para el historial de películas vistas en la base de datos MySQL.
 * @namespace watchHistoryModel
 */
const watchHistoryModel = {
    /**
     * Función para obtener el historial de películas vistas de un usuario.
     * @async
     * @function getWatchHistory
     * @param {number|string} user_id - El ID del usuario para el que se quiere obtener el historial.
     * @returns {Promise<Array>} Devuelve un array con los registros del historial de películas vistas.
     */
    // Funcion para obtener el historial de peliculas vistas
    getWatchHistory: async (user_id) => {
        const query = `SELECT * FROM ?? WHERE user_id = ?`;
        return await executeQuery(query, [tableName, user_id]);
    },

    /**
     * Función para agregar una película al historial de un usuario.
     * @async
     * @function addWatchHistory
     * @param {number|string} user_id - El ID del usuario al que se le agregará la película al historial.
     * @param {number|string} movie_id - El ID de la película que se va a agregar al historial.
     * @param {string} title - El título de la película.
     * @param {string} poster - La URL del cartel de la película.
     * @returns {Promise<number>} Devuelve el ID del registro recién creado en el historial.
     */
    // Funcion para agregar una pelicula  al historial
    addWatchHistory: async (user_id, movie_id, title, poster) => {
        return await crudMySQL.createData(tableName, ['user_id', 'movie_id', 'title', 'poster', 'watched_at'], [user_id, movie_id, title, poster, new Date()]);
    },

    /**
    * Función para eliminar una película del historial de un usuario.
    * @async
    * @function deleteWatchHistory
    * @param {number|string} userId - El ID del usuario de cuyo historial se eliminará la película.
    * @param {number|string} movieId - El ID de la película que se eliminará del historial.
    * @returns {Promise<number>} Devuelve el número de filas afectadas por la eliminación.
    */
    // Funcion para eliminar el historial
    deleteWatchHistory: async (userId, movieId) => {
        return await crudMySQL.deleteData(tableName, 'user_id', userId, 'movie_id', movieId);
    }
};

export default watchHistoryModel;