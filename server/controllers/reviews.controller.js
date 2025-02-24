import crudMongoDBReviews from "../models/MongoModels/reviews.models.js";

export default {
    /**
        * Inserta una nueva reseña para una película.
        * 
        * 
        * @param {Request} req - Objeto de solicitud de Express, que contiene los datos necesarios en el cuerpo de la solicitud (`userId`, `movieId`, `rating`, `review`).
        * @param {Response} res - Objeto de respuesta de Express, que envía un mensaje de éxito o error al cliente.
        * @returns {Promise<void>} Responde con un mensaje de éxito y la reseña insertada si la operación es exitosa, o un mensaje de error si algo falla.
        * @throws {Error} Lanza un error si hay un problema al insertar la reseña en la base de datos.
        */

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
