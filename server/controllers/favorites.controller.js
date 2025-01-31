import crudMongoDB from "../utils/crudMongoDB.js";

export default {
    addFavorites: async (req, res) => {
        const movieData = req.body;

        try {
            const result = await crudMongoDB.insertFavorites(movieData);
            res.status(201).json({ message: 'Película agregada a favoritos', result });
        } catch (error) {
            console.error('Error al agregar a favoritos:', error);
            res.status(500).json({ message: 'Error al agregar la película a favoritos' });
        }
    }
};