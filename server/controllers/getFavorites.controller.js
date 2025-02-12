import crudMongoDb from "../models/MongoModels/favorites.models.js";


export default {
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