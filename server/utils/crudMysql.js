import sql from '../database/mysql.connection.js';

const connection = await sql.mySQLConnection();

/* --------- CRUD -----------*/
export default {

    loginUsers: async (values) => {
        const query = `
       SELECT ??, ??, ??, ??
FROM ??
WHERE ?? = ? AND ?? = ?

    `
        const result = await connection.query(query, [...values]);
        return result;
    },
    createUser: async (values) => {
        const query = `
        INSERT INTO ??
        VALUES(NULL, ?, ?, ?, ?, ?)
    `;
        const [result] = await connection.query(query, [...values]);
        return result.insertId;
    },


    updateUser: async (values) => {
        const query = `
        UPDATE ??
        SET
            ?? = ?, -- user_name
            ?? = ?, -- user_lastnames
            ?? = ?, -- email
            ?? = ?, -- password
            ?? = ?  -- created_at
        WHERE ?? = ?
    `;
        const [result] = await connection.query(query, [...values]);
        return result.affectedRows;
    },
}