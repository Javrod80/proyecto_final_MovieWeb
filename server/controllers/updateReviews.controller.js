import crudMongoDBReviews from "../models/MongoModels/reviews.models.js";

export default {
    updateReviews: async (req, res) => {
        const { reviewId } = req.params;
        const { rating, review: reviewText } = req.body; 
        const userId = req.user.id;

        if (!reviewId || !Number.isFinite(rating) || !reviewText?.trim()) {
            return res.status(400).json({ error: "Faltan datos requeridos" });
        }


        try {
            const reviewToUpdate = await crudMongoDBReviews.getReviewById(reviewId);

            if (!reviewToUpdate || reviewToUpdate.length === 0) {
                return res.status(404).json({ error: "Reseña no encontrada" });
            }

            const review = reviewToUpdate[0]; 

            if (Number(review.userId) !== Number(userId)) {
                return res.status(403).json({ error: "No tienes permisos para actualizar esta reseña" });
            }

            const updatedReview = await crudMongoDBReviews.updateMovieReview(reviewId, { rating, review: reviewText }); 

            if (updatedReview && updatedReview.modifiedCount > 0) { 
                return res.status(200).json({ message: "Reseña actualizada exitosamente", review: updatedReview });
            } else {
                return res.status(404).json({ error: "No se pudo actualizar la reseña (podría no existir o no haber cambios)" });
            }

        } catch (error) {
            console.error('Error al actualizar la reseña:', error);
            return res.status(500).json({ error: "Error interno del servidor" });
        }
    }
};