import crudMySQL, { executeQuery } from './genericMySQL.models.js';
import dotenv from 'dotenv';
dotenv.config();

const tableName = process.env.TAB_FIRST;

const usersModel = {
    // Funcion para registrar un nuevo usuario
    createUser: async (user_name, user_lastnames, email, password) => {
        return await crudMySQL.createData(tableName, ['user_name', 'user_lastnames', 'email', 'password'], [user_name, user_lastnames, email, password]);
    },
    // Funcion para hacer login
    loginUser: async (email, password) => {
        const query = 'SELECT * FROM ?? WHERE email = ? AND password = ?';
        return await executeQuery(query, [tableName, email, password]);
    },
    // Funcion para obtener todos los usuarios
    getAllUsers: async () => {
        return await crudMySQL.getData(tableName);
    },
    // Funcion para obtener un usuario por su ID
    updateUser: async (userId, updateFields) => {
        const columns = Object.keys(updateFields);
        const values = Object.values(updateFields);
        return await crudMySQL.updateData(tableName, columns, values, 'id', userId);
    },
    // Funcion para eliminar un usuario
    deleteUser: async (userId) => {
        return await crudMySQL.deleteData(tableName, 'id', userId);
    }
};

export default usersModel;