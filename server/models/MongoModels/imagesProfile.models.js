import  { deleteFromCollection, insertIntoCollection}  from './genericMongo.models.js';
import { executeDbOperation } from './mongo.models.js';
import path from 'path';
import dotenv from 'dotenv';
dotenv.config();
const collectionName = process.env.COLL_IMAG;

const crudMongoDBImages = {

    /**
     * Función para insertar la imagen en la colección de imágenes
     * @param {string} userId - El ID del usuario que sube la imagen.
     * @param {string} imagePath - La ruta de la imagen subida.
     * @returns {Promise<Object>} - Devuelve una promesa con el resultado de la operación de inserción.
     */
    insertImageForUser: async (userId, imagePath) => {
        return insertIntoCollection(collectionName, {
            userId,
            imagePath:`files/${userId}/${path.basename(imagePath)}`,
            createdAt: new Date(),
        });
    },
    /**
  * Función para obtener la última imagen de perfil de un usuario
  * @param {string} userId - El ID del usuario.
  * @returns {Promise<Object|null>} - Devuelve la última imagen del usuario o null si no tiene.
  */
    getImagesForUser: async (userId) => {
        return executeDbOperation(collectionName, (collection) =>
            collection.find({ userId }).sort({ createdAt: -1 }).limit(1).toArray()
        );
    },
    /**
     * Función para eliminar una imagen de un usuario
     * @param {string} userId - El ID del usuario.
     * @param {string} imageId - El ID de la imagen a eliminar.
     * @returns {Promise<Object>} - Devuelve una promesa con el resultado de la operación de eliminación.
     */
    deleteImageForUser: async (userId, imageId) => {
        return deleteFromCollection(collectionName, { userId, _id: new ObjectId(imageId) });
    }
}

export default crudMongoDBImages;