import crudMongoDBReviews from "../models/MongoModels/reviews.models.js";

export default {

    /**
       * Obtiene las reseñas de una película de la base de datos.
       * 
       * 
       * @param {Request} req - Objeto de solicitud de Express, que contiene el `movieId` en los parámetros de la solicitud.
       * @param {Response} res - Objeto de respuesta de Express, que enviará las reseñas de la película o un mensaje de error.
       * @returns {Promise<void>} Responde con las reseñas de la película si la operación tiene éxito, o un mensaje de error si algo falla.
       * @throws {Error} Lanza un error si hay un problema al obtener las reseñas de la base de datos.
       */
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