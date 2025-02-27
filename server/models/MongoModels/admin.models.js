import { getClient } from './mongo.models.js';

/**
 * Función genérica para obtener datos agrupados de una colección.
 * @async
 * @function getGroupedData
 * @param {string} collectionName - El nombre de la colección en la base de datos.
 * @param {Object} groupFields - Los campos por los cuales se agruparán los datos.
 * @param {Object} additionalGroupFields - Los campos adicionales que se agregarán al grupo.
 * @param {Object} sortFields - Los campos por los cuales se ordenarán los datos agrupados.
 * @returns {Promise<Array>} Devuelve una promesa que contiene un arreglo con los documentos agrupados.
 */

const getGroupedData = async (collectionName, groupFields,additionalGroupFields, sortFields) => {
    const client = await getClient();
    const db = client.db(process.env.MONGO_BBDD);
    const collection = db.collection(collectionName);

    try {
        const result = await collection.aggregate([
            {
                $group: {
                    _id: groupFields,
                    ...additionalGroupFields,
                    count: { $sum: 1 }
                }
            },
            {
                $sort: sortFields
            }
        ]).toArray();
      //  console.log("Datos agrupados obtenidos:", result);
        return result;
    } catch (error) {
        console.error('Error al agrupar datos en la colección:', error);
        throw error;
    }
};
/**
 * Función para obtener los datos agrupados de la colección de favoritos.
 * @async
 * @function getFavoritesGrouped
 * @returns {Promise<Array>} Devuelve una promesa que contiene un arreglo con los documentos agrupados de favoritos.
 */
const getFavoritesGrouped = async () => {
    const groupFields = { imdbID: "$imdbID", Title: "$Title", Poster: "$Poster", Plot: "$Plot" };
    const additionalGroupFields = { users: { $push: "$userId" } };
    const sortFields = { count: -1, "Title": 1 };
    return getGroupedData(process.env.COLL_FAV, groupFields, additionalGroupFields, sortFields);
};
/**
 * Función para obtener las reseñas agrupadas por película.
 * @async
 * @function getReviewsGrouped
 * @returns {Promise<Array>} Devuelve una promesa que contiene un arreglo con los documentos agrupados de reseñas.
 */

const getReviewsGrouped = async () => {
    const groupFields = { movieId: "$movieId" };
    const additionalGroupFields = {
        reviews: {
            $push: {
                userId: "$userId",
                rating: "$rating",
                review: "$review"
            }
        }
    };
    const sortFields = { count: -1, "_id.movieId": 1 };
    return getGroupedData(process.env.COLL_REV, groupFields, additionalGroupFields, sortFields);
};

export { getFavoritesGrouped, getReviewsGrouped };



