import crudMongoDb from "../utils/crudMongoDB.js";


export default {
    getFavorites: async (req, res) => {
        try {
            const result = await crudMongoDb.getFavorites();
            res.status(200).json(result);
        } catch (error) {
            console.error('Error al obtener favoritos:', error);
            res.status(500).json({ message: 'Error al obtener favoritos' });
        }
    }
};