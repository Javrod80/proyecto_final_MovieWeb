import crudMongoDBImages from "../models/MongoModels/imagesProfile.models.js";

export default {
    /**
     * Obtiene la imagen de perfil de un usuario.
     * 
     * @param {Request} req - Objeto de solicitud de Express.
     * @param {Response} res - Objeto de respuesta de Express.  
     * @returns {Promise<void>} Responde con la imagen de perfil del usuario o un mensaje de error.
     */
    getProfileImage: async (req, res) => {
        

        try {
          // console.log("Request completo:", req);
            const userId = String(req.userId);
          // console.log("userId", userId);
            const images = await crudMongoDBImages.getImagesForUser(userId);

            // Verifica si se encontró la imagen
            if (!images || images.length === 0 || !images[0].imagePath) {
                return res.status(404).json({ error: 'No se encontró la imagen de perfil' });
            }

            
            const latestImage = images[0];
            res.json({ imagePath: latestImage.imagePath });

        } catch (error) {
            console.error('Error al obtener la imagen de perfil:', error);
            res.status(500).json({ error: 'Error al obtener la imagen de perfil' });
        }
    }
};
