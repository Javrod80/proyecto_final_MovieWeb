import crudMongoDBReviews from "../models/MongoModels/favorites.js";

export default {

    deleteFavorites: async (req, res) => {
        const { movieId } = req.params;
        const userId = req.user?.id;

        if (!movieId|| !userId) {
            return res.status(400).json({ error: "Se requiere movieId" });
        }

        try {
            const result = await crudMongoDBReviews.deleteFavorite(userId, movieId);
            if (result.deletedCount > 0) {
                return res.status(200).json({ message: "Película eliminada de favoritos" });
            } else {
                return res.status(404).json({ error: "No se pudo eliminar la película de favoritos (podría no existir o no haber cambios)" });
            }
        } catch (error) {
            console.error('Error al eliminar de favoritos:', error);
            res.status(500).json({ message: 'Error al eliminar de favoritos' });
        }
        }
        
};