import crudMongoDBReviews from "../models/MongoModels/reviews.js";

export default {
    insertReview: async (req, res) => {
        const { userId, movieId,rating,  review } = req.body;

        if (!userId || !movieId || !review) {
            return res.status(400).json({ error: "Faltan datos requeridos" });
        }

        try {
            const newReview = await crudMongoDBReviews.addMovieReview(userId, movieId,rating,  review);
            return res.status(201).json({ message: "Reseña agregada exitosamente", review: newReview });
        } catch (error) {
            console.error("Error en insertReview:", error);
            return res.status(500).json({ error: "Error interno del servidor" });
        }
    },

};
