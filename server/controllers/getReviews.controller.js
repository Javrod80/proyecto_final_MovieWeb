import crudMongoDBReviews from "../models/MongoModels/reviews.models.js";

export default {
    

getReviews: async (req, res) => {
    const { movieId } = req.params;

    if (!movieId) {
        return res.status(400).json({ error: "Se requiere movieId" });
    }

    try {
        const reviews = await crudMongoDBReviews.getMovieReviews(movieId);
        return res.status(200).json(reviews);
    } catch (error) {
        console.error("Error en getReviews:", error);
        return res.status(500).json({ error: "Error interno del servidor" });
    }
}
}