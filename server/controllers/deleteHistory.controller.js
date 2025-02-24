import watchHistoryModel from "../models/MySQLModels/watchHistory.models.js";


export default {

    /**
    * Elimina una película del historial de visualización de un usuario.
    * 
    * 
    * @param {Request} req - Objeto de solicitud de Express.
    * @param {Response} res - Objeto de respuesta de Express.
    * @returns {Promise<void>} Responde con un mensaje de éxito o un error.
    */
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
