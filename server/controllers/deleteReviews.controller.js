import crudMongoDBReviews from "../models/MongoModels/reviews.js";


export default {

    deleteReview: async (req, res) => {
        const { reviewId } = req.params;
        const userId = req.user.id;

        try {
            
            const reviewToDelete = await crudMongoDBReviews.getReviewById(reviewId);

            if (!reviewToDelete || reviewToDelete.length === 0) {
                return res.status(404).json({ error: "Reseña no encontrada" });
            }

            const review = reviewToDelete[0]; 

           
            if (Number(review.userId) !== Number(userId)) {
                return res.status(403).json({ error: "No tienes permisos para eliminar esta reseña" });
            }

           
            const deletedReview = await crudMongoDBReviews.deleteMovieReview(reviewId, userId);

            if (deletedReview.deletedCount > 0) { // Verifica deletedCount
                return res.status(200).json({ message: "Reseña eliminada exitosamente" });
            } else {
                return res.status(404).json({ error: "No se pudo eliminar la reseña (podría no existir o no haber cambios)" });
            }

        } catch (error) {
            console.error('Error al eliminar la reseña:', error);
            return res.status(500).json({ error: "Error interno del servidor" });
        }
    }
};


