import sql from '../../database/mysql.connection.js';

const connection = await sql.mySQLConnection();

/* --------- Función General para Ejecutar Consultas -----------*/
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
const crudMySQL = {
    // Función para hacer login con múltiples condiciones
    loginUser: async (values) => {
        const query = `
        SELECT ?? 
        FROM ?? 
        WHERE ?? = ? AND ?? = ? AND (?? = ? OR ?? = ?)
        `;
        const result = await executeQuery(query, values);
        return result;
    },

    // Función para crear un nuevo registro
    createData: async (table, columns, values) => {
        const query = `INSERT INTO ?? (${columns.join(', ')}) VALUES (${columns.map(() => '?').join(', ')})`;
        const result = await executeQuery(query, [table, ...values]);
        return result.insertId; // Retorna el ID del registro insertado
    },

    // Función para obtener todos los registros de una tabla
    getData: async (table) => {
        const query = 'SELECT * FROM ??';
        const [result] = await executeQuery(query, [table]);
        return result;
    },

    // Función para actualizar un registro
    updateData: async (table, updateColumns, values, filterColumn, filterValue) => {
        const query = `UPDATE ?? SET ${updateColumns.map(col => `?? = ?`).join(', ')} WHERE ?? = ?`;
        const result = await executeQuery(query, [table, ...updateColumns.flatMap((col, i) => [col, values[i]]), filterColumn, filterValue]);
        return result.affectedRows; // Retorna el número de filas afectadas
    },

    // Función para "eliminar" un registro 
    deleteData: async (table, filterColumn1, filterValue1, filterColumn2, filterValue2) => {
        const query = 'DELETE FROM ?? WHERE ?? = ? AND ?? = ?';
        const result = await executeQuery(query, [table, filterColumn1, filterValue1, filterColumn2, filterValue2]);
        return result.affectedRows; // Retorna el número de filas afectadas
    }
  
};

export default crudMySQL;