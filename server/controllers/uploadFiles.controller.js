import crudMongoDBImages from "../models/MongoModels/imagesProfile.models.js";


export default {

    /**
    * Sube un archivo de imagen y lo asocia a un usuario en la base de datos.
    * 
    * @async
    * @function uploadFiles
    * @param {Request} req - Objeto de solicitud de Express.
    * @param {Response} res - Objeto de respuesta de Express.
    * @returns {Promise<void>} Responde con un mensaje de éxito o error en formato JSON.
    */
    uploadFiles: async (req, res) => {
        try {

            const userId = req.userId;


            if (!req.file) {
                return res.status(400).json({ message: "No se ha subido ningún archivo." });
            }
            /**
            * Ruta donde se almacena la imagen subida.
            * @constant {string}
            */
            const imagePath = `files/${req.file.filename}`;

            /**
            * Inserta la imagen en la base de datos y asocia el archivo al usuario.
            * @constant {Object} result - Resultado de la operación de inserción en MongoDB.
            * @property {string} result.insertedId - ID del documento insertado en la base de datos.
            */
            const result = await crudMongoDBImages.insertImageForUser(userId, imagePath);

            res.status(200).json({ message: "Imagen subida con éxito", imageId: result.insertedId, imagePath });
        } catch (err) {
            console.error(err);
            res.status(500).json({ message: "Error al subir la imagen." });
        }
    }
}