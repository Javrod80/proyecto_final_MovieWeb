import crudMongoDBReviews from "../models/MongoModels/favorites.js";

export default {

    deleteFavorites: async (req, res) => {
        const { favoriteId } = req.params;
        const userId = req.user.id;

        try {
            
            const favoriteToDelete = await crudMongoDBReviews.getReviewById(favoriteId);

            if (!favoriteToDelete || favoriteToDelete.length === 0) {
                return res.status(404).json({ error: "Pelicula favorita  no encontrada" });
            }

            const favorite = favoriteToDelete[0]; 

           
            if (Number(favorite.userId) !== Number(userId)) {
                return res.status(403).json({ error: "No tienes permisos para eliminar favoritos" });
            }

           
            const deletedFavorite = await crudMongoDBReviews.deleteFavorite(favoriteId, userId);

            if (deletedFavorite.deletedCount > 0) { // Verifica deletedCount
                return res.status(200).json({ message: "Pelicula eliminada exitosamente" });
            } else {
                return res.status(404).json({ error: "No se pudo eliminar la pelicula (podría no existir o no haber cambios)" });
            }

        } catch (error) {
            console.error('Error al eliminar la pelicula:', error);
            return res.status(500).json({ error: "Error interno del servidor" });
        }
    }
};