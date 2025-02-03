import sql from '../database/mysql.connection.js';

const connection = await sql.mySQLConnection();

/* --------- CRUD -----------*/
export default {

    loginUsers: async (values) => {
        const [email, password] = values;

        const query = `
    SELECT id, user_name, user_lastnames, email, password
    FROM users
    WHERE email = ? AND password = ?
`;
  
        const result = await connection.query(query, [email, password]);
    
        
        return result;
    },
    createUser: async (values) => {
        
            const query = `
        INSERT INTO users (user_name, user_lastnames, email, password, created_at)
        VALUES (?, ?, ?, ?, ?)
    `;
            const [result] = await connection.query(query, values);
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


    watchHistory: async (values) => {
        const query = `
        SELECT * FROM watch_history
        WHERE user_id = ?
    `;
        const [result] = await connection.query(query, values);
        return result;
    }

}