import crudMongoDBImages from "../models/MongoModels/imagesProfile.models.js";


export default {
    /**
     * Obtiene la imagen de perfil de un usuario.
     * 
     * 
     * @param {Request} req - Objeto de solicitud de Express.
     * @param {Response} res - Objeto de respuesta de Express.  
     * @returns {Promise<void>} Responde con la imagen de perfil del usuario o un mensaje de error.
     */
    getProfileImage: async (req, res) => {
        try {
            const userId = req.userId;
            const image = await crudMongoDBImages.getImagesForUser(userId);
            res.json(image);
        } catch (error) {
            console.error('Error al obtener la imagen de perfil:', error);
            res.status(500).json({ error: 'Error al obtener la imagen de perfil' });
        }   
    }   
}