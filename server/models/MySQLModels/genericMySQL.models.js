import sql from '../../database/mysql.connection.js';

const connection = await sql.mySQLConnection();

/* --------- Función General para Ejecutar Consultas -----------*/
/**
 * Función general para ejecutar consultas SQL.
 * @async
 * @function executeQuery
 * @param {string} query - La consulta SQL que se va a ejecutar.
 * @param {Array} values - Los valores que se van a utilizar en la consulta.
 * @returns {Promise<Object>} Devuelve el resultado de la consulta.
 * @throws {Error} Lanza un error si la consulta falla.
 */
export const executeQuery = async (query, values) => {
    try {
        const [result] = await connection.query(query, values);
        return result;
    } catch (error) {
        console.error("Error en la consulta:", error);
        throw error;
    }
};

/* --------- Funciones CRUD Generales -----------*/
/**
 * Objeto con funciones CRUD para interactuar con una base de datos MySQL.
 * @namespace crudMySQL
 */
const crudMySQL = {
    
    /**
    * Función para hacer login con múltiples condiciones.
    * @async
    * @function loginUser
    * @param {Array} values - Un array con los valores que se usarán en la consulta (usuario, contraseña, y condiciones adicionales).
    * @returns {Promise<Object>} Devuelve el resultado de la consulta con los datos del usuario.
    */
    loginUser: async (values) => {
        const query = `
        SELECT ?? 
        FROM ?? 
        WHERE ?? = ? AND ?? = ? AND (?? = ? OR ?? = ?)
        `;
        const result = await executeQuery(query, values);
        return result;
    },
    /**
     * Función para crear un nuevo registro en una tabla.
     * @async
     * @function createData
     * @param {string} table - El nombre de la tabla en la que se insertará el nuevo registro.
     * @param {Array} columns - Las columnas en las que se insertarán los valores.
     * @param {Array} values - Los valores a insertar en la tabla.
     * @returns {Promise<number>} Devuelve el ID del registro insertado.
     */

    // Función para crear un nuevo registro
    createData: async (table, columns, values) => {
        const query = `INSERT INTO ?? (${columns.join(', ')}) VALUES (${columns.map(() => '?').join(', ')})`;
        const result = await executeQuery(query, [table, ...values]);
        return result.insertId; // Retorna el ID del registro insertado
    },

    /**
     * Función para obtener todos los registros de una tabla.
     * @async
     * @function getData
     * @param {string} table - El nombre de la tabla de la que se obtendrán los registros.
     * @returns {Promise<Array>} Devuelve una promesa con los registros obtenidos de la tabla.
     */
    // Función para obtener todos los registros de una tabla
    getData: async (table) => {
        const query = 'SELECT * FROM ??';
        const [result] = await executeQuery(query, [table]);
        return result;
    },

    /**
    * Función para actualizar un registro en una tabla.
    * @async
    * @function updateData
    * @param {string} table - El nombre de la tabla en la que se actualizarán los registros.
    * @param {Array} updateColumns - Las columnas que se van a actualizar.
    * @param {Array} values - Los nuevos valores para las columnas que se actualizan.
    * @param {string} filterColumn - La columna que se usa como filtro para encontrar el registro.
    * @param {string|number} filterValue - El valor que se usa como filtro para encontrar el registro.
    * @returns {Promise<number>} Devuelve el número de filas afectadas por la actualización.
    */
    // Función para actualizar un registro
    updateData: async (table, updateColumns, values, filterColumn, filterValue) => {
        const query = `UPDATE ?? SET ${updateColumns.map(col => `?? = ?`).join(', ')} WHERE ?? = ?`;
        const result = await executeQuery(query, [table, ...updateColumns.flatMap((col, i) => [col, values[i]]), filterColumn, filterValue]);
        return result.affectedRows; // Retorna el número de filas afectadas
    },

    /**
    * Función para eliminar un registro de una tabla.
    * @async
    * @function deleteData
    * @param {string} table - El nombre de la tabla de la que se eliminará el registro.
    * @param {string} filterColumn - La columna que se usa como filtro para encontrar el registro.
    * @param {string|number} filterValue - El valor que se usa como filtro para encontrar el registro.
    * @returns {Promise<number>} Devuelve el número de filas afectadas por la eliminación.
    */
    // Función para "eliminar" un registro 
    deleteData: async (table, filterColumn, filterValue) => {
        const query = 'DELETE FROM ?? WHERE ?? = ?';
        const result = await executeQuery(query, [table, filterColumn, filterValue]);
        return result.affectedRows; // Retorna el número de filas afectadas
    }
  
};

export default crudMySQL;