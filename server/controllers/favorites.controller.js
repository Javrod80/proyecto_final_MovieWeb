import crudMongoDB from "../models/MongoModels/favorites.models.js";




export default {
    /**
     * Agrega una película a los favoritos del usuario.
     * 
     * 
     * @param {Request} req - Objeto de solicitud de Express, que contiene el `userId` y los detalles de la película en el cuerpo de la solicitud.
     * @param {Response} res - Objeto de respuesta de Express, que envía una respuesta de éxito o error.
     * @returns {Promise<void>} Responde con un mensaje de éxito y el resultado de la operación, o un mensaje de error si algo falla.
     * @throws {Error} Lanza un error si ocurre un problema al agregar la película a favoritos.
     */
    addFavorites: async (req, res) => {
       // console.log("Cuerpo de la petición:", req.body); 

        const{userId , ...movie} = req.body;


        if (!userId || !movie) {
            return res.status(400).json({ message: "Faltan datos requeridos" });
        }

        try {
            const result = await crudMongoDB.insertFavorites(userId, movie);
            res.status(201).json({ message: 'Película agregada a favoritos', result });
        } catch (error) {
            console.error('Error al agregar a favoritos:', error);
            res.status(500).json({ message: 'Error al agregar la película a favoritos' });
        }
    }
};
