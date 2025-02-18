import crudMongoDb from "../models/MongoModels/favorites.models.js";


export default {
    /**
     * Obtiene los favoritos de un usuario de la base de datos.
     * @async
     * @function getFavorites
     * @param {import("express").Request} req - Objeto de solicitud de Express, que contiene el `userId` en los parámetros de la consulta.
     * @param {import("express").Response} res - Objeto de respuesta de Express, que enviará la respuesta con los favoritos del usuario o un mensaje de error.
     * @returns {Promise<void>} Responde con la lista de favoritos del usuario si la operación tiene éxito, o un mensaje de error si algo falla.
     * @throws {Error} Lanza un error si hay un problema al obtener los favoritos desde la base de datos.
     */
    getFavorites: async (req, res) => {
        const { userId } = req.query;
        const userIdNumber = Number(userId);  // Convierte a número para evitar errores en la consulta en MongoDB
       // console.log('userId convertido a número:', userIdNumber); // Verificación
      //  console.log('userId obtenido:', userId); // Verifica si está obteniendo el valor correctamente

        try {
            await new Promise(resolve => setTimeout(resolve, 300));
            // Realiza la consulta en MongoDB y loggea el resultado antes de enviarlo
            const result = await crudMongoDb.getFavorites(userIdNumber);
           // console.log("Resultado de la consulta en MongoDB:", result); // Verifica el resultado
            res.status(200).json(result);
        } catch (error) {
            console.error('Error al obtener favoritos:', error);
            res.status(500).json({ message: 'Error al obtener favoritos' });
        }
    }
};