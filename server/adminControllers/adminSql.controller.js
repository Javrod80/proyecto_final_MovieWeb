import usersModel from '../models/MySQLModels/users.models.js';
import genericMySqlModel from '../models/MySQLModels/genericMySQL.models.js';
import dotenv from 'dotenv';
dotenv.config();

const tableName = process.env.TAB_SECOND;

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
