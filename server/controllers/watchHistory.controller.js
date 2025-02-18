import watchHistoryModel from "../models/MySQLModels/watchHistory.models.js";



export default {
    /**
    * Obtiene el historial de películas vistas por un usuario.
    * @async
    * @function getWatchHistory
    * @param {import("express").Request} req - Objeto de solicitud de Express que contiene el `user_id` del usuario.
    * @param {import("express").Response} res - Objeto de respuesta de Express utilizado para devolver el historial de películas o un mensaje de error.
    * @returns {Promise<void>} Devuelve el historial de películas vistas por el usuario si la consulta es exitosa, o un mensaje de error si falla.
    * @throws {Error} Lanza un error si hay problemas al obtener el historial desde la base de datos.
    */

    // Controlador para obtener el historial de peliculas vistas
    getWatchHistory: async (req, res) => {
        const { user_id } = req.params;
        try {
            const history = await watchHistoryModel.getWatchHistory(user_id);
            res.json(history);
        } catch (error) {
            console.error('Error al obtener historial:', error);
            res.status(500).json({ error: 'Error al obtener historial' });
        }
    },
    

    /**
     * Agrega una película al historial de un usuario.
     * @async
     * @function addWatchHistory
     * @param {import("express").Request} req - Objeto de solicitud de Express que contiene los datos de la película (`user_id`, `movie_id`, `title`, `poster`) a agregar al historial.
     * @param {import("express").Response} res - Objeto de respuesta de Express utilizado para devolver un mensaje de éxito o error.
     * @returns {Promise<void>} Devuelve un mensaje de éxito si la película se agrega correctamente al historial, o un mensaje de error si ocurre un problema.
     * @throws {Error} Lanza un error si ocurre un problema al agregar la película al historial de la base de datos.
     */
    // Controlador para agregar una pelicula  al historial
    addWatchHistory: async (req, res) => {

      
        const { user_id, movie_id, title, poster } = req.body;
        if (!user_id || !movie_id || !title || !poster) {
            return res.status(400).json({ error: 'Todos los campos son obligatorios' });
        }
        try {
            await watchHistoryModel.addWatchHistory(user_id, movie_id, title, poster);
            res.json({ message: 'Historial actualizado' });
        } catch (error) {
            console.error('Error al agregar al historial:', error);
            res.status(500).json({ error: 'Error al agregar al historial' });
        }
    }
    
};
