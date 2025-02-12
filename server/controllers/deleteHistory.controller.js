import watchHistoryModel from "../models/MySQLModels/watchHistory.models.js";


export default {

    deleteWatchHistoryUser: async (req, res) => {
        const { userId,movieId} = req.params;
        
        try {
            await watchHistoryModel.deleteWatchHistory(userId,movieId);
            res.json({ message: 'Historial de peliculas eliminado' });
        } catch (error) {
            console.error('Error al eliminar el historial de peliculas:', error);
            res.status(500).json({ error: 'Error al eliminar el historial de peliculas' });
        }
    }



}
