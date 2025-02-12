import watchHistoryModel from "../models/MySQLModels/watchHistory.models.js";



export default {

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
