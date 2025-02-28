import { getFavoritesGrouped, getReviewsGrouped } from '../models/MongoModels/AdminMongoModels/admin.models.js';

/**
 * Función genérica para manejar las solicitudes y obtener los datos agrupados.
 * @async
 * @function handleRequest
 * @param {Function} getDataFunction - La función que obtiene los datos agrupados.
 * @param {Request} req - La solicitud de Express.
 * @param {Response} res - La respuesta de Express.
 */
const handleRequest = async (getDataFunction, req, res) => {
    try {
        const data = await getDataFunction();
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export default {
    getAllFavorites: (req, res) => handleRequest(getFavoritesGrouped, req, res),
    getAllReviews: (req, res) => handleRequest(getReviewsGrouped, req, res)
};















