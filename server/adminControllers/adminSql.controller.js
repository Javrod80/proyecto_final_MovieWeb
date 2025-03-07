import usersModel from '../models/MySQLModels/users.models.js';
import genericMySqlModel from '../models/MySQLModels/genericMySQL.models.js';
import dotenv from 'dotenv';
dotenv.config();

const tableName = process.env.TAB_SECOND;
 /**
   * Obtener todos los usuarios.
   *
   * Este método obtiene una lista de todos los usuarios utilizando el modelo usersModel.
   *
   * @async
   * @function getAllUsers
   * @param {object} req - El objeto de solicitud.
   * @param {object} res - El objeto de respuesta.
   * @returns {Promise<void>} Retorna una respuesta JSON con la lista de usuarios o un mensaje de error.
   */
export default {
    getAllUsers: async (req, res) => {
     
        try {
            const users = await usersModel.getAllUsers();
            res.json(users); 
        } catch (error) {
            console.error("Error al obtener usuarios:", error);
            res.status(500).json({ message: "Error al obtener usuarios" });
        }
    },
    getAllWatchHistory: async (req, res) => {
     
        try {
            const watchHistory = await genericMySqlModel.getData(tableName);
          
            res.json(watchHistory); 
        } catch (error) {
            console.error("Error al obtener historial de visualización:", error);
            res.status(500).json({ message: "Error al obtener historial de visualización" });
        }
    }
};
