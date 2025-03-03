import  {getDataFromCollection, deleteFromCollection, insertIntoCollection}  from './genericMongo.models.js';

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
            imagePath,
            createdAt: new Date(),
        });
    },
    /**
     * Función para obtener las imágenes de un usuario
     * @param {string} userId - El ID del usuario.
     * @returns {Promise<Array>} - Devuelve una promesa con un arreglo de las imágenes asociadas al usuario.
     */
    getImagesForUser: async (userId) => {
        return getDataFromCollection(collectionName, { userId });
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