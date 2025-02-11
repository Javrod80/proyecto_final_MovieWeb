import crudMySQL from './genericMySQL.js';
import { executeQuery } from './genericMySQL.js';
import dotenv from 'dotenv';
dotenv.config();

const tableName = process.env.TAB_SECOND;

const watchHistoryModel = {
    // Funcion para obtener el historial de peliculas vistas
    getWatchHistory: async (user_id) => {
        const query = `SELECT * FROM ?? WHERE user_id = ?`;
        return await executeQuery(query, [tableName, user_id]);
    },
    // Funcion para agregar una pelicula  al historial
    addWatchHistory: async (user_id, movie_id, title, poster) => {
        return await crudMySQL.createData(tableName, ['user_id', 'movie_id', 'title', 'poster', 'watched_at'], [user_id, movie_id, title, poster, new Date()]);
    },
    // Funcion para eliminar el historial
    deleteWatchHistory: async (userId, movieId) => {
        return await crudMySQL.deleteData(tableName, 'user_id', userId, 'movie_id', movieId);
    }
};

export default watchHistoryModel;