import crudMySQL, { executeQuery } from './genericMySQL.models.js';
import dotenv from 'dotenv';
dotenv.config();

const tableName = process.env.TAB_FIRST;

/**
 * Modelo de operaciones CRUD para la tabla de usuarios en la base de datos MySQL.
 * @namespace usersModel
 */

const usersModel = {
    /**
     * Función para registrar un nuevo usuario.
     * @async
     * @function createUser
     * @param {string} user_name - El nombre del usuario.
     * @param {string} user_lastnames - Los apellidos del usuario.
     * @param {string} email - El correo electrónico del usuario.
     * @param {string} password - La contraseña del usuario.
     * @returns {Promise<number>} Devuelve el ID del usuario recién creado.
     */
    // Funcion para registrar un nuevo usuario
    createUser: async (user_name, user_lastnames, email, password, rol = 'usuario') => {
        return await crudMySQL.createData(tableName, ['user_name', 'user_lastnames', 'email', 'password', 'rol'], [user_name, user_lastnames, email, password, rol]);
    },

    /**
     * Función para hacer login con un usuario.
     * @async
     * @function loginUser
     * @param {string} email - El correo electrónico del usuario.
     * @returns {Promise<Object>} Devuelve el resultado de la consulta con los datos del usuario si se encuentra.
     */
    // Funcion para hacer login
    loginUser: async (email) => {
        const query = 'SELECT * FROM ?? WHERE email = ? ';
        return await executeQuery(query, [tableName, email]);
    },

    /**
     * Función para obtener todos los usuarios.
     * @async
     * @function getAllUsers
     * @returns {Promise<Array>} Devuelve una lista con todos los usuarios en la base de datos.
     */
    // Funcion para obtener todos los usuarios
    getAllUsers: async () => {
        return await crudMySQL.getData(tableName);
    },

    /**
     * Función para actualizar los datos de un usuario específico.
     * @async
     * @function updateUser
     * @param {number|string} userId - El ID del usuario que se actualizará.
     * @param {Object} updateFields - Un objeto con los campos a actualizar y sus nuevos valores.
     * @returns {Promise<number>} Devuelve el número de filas afectadas por la actualización.
     * @throws {Error} Lanza un error si falta el ID o los datos para actualizar.
     */
    // Funcion para obtener un usuario por su ID
    updateUser: async (userId, updateFields) => {
        if (!userId || !updateFields || Object.keys(updateFields).length === 0) {
            throw new Error("Faltan datos para actualizar el usuario");
        }
        const columns = Object.keys(updateFields);
        const values = Object.values(updateFields);
        return await crudMySQL.updateData(tableName, columns, values, 'id', userId);
    },

    /**
     * Función para eliminar un usuario por su ID.
     * @async
     * @function deleteUser
     * @param {number|string} userId - El ID del usuario a eliminar.
     * @returns {Promise<number>} Devuelve el número de filas afectadas por la eliminación.
     */
    // Funcion para eliminar un usuario
    deleteUser: async (userId) => {
        return await crudMySQL.deleteData(tableName, 'id', userId);
    },
    getUserById: async (userId) => {
        const query = 'SELECT * FROM ?? WHERE id = ?';
        return await executeQuery(query, [tableName, userId]);
    },

};

export default usersModel;