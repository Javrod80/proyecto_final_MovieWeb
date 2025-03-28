import * as mysql from 'mysql2/promise'
import dotenv from 'dotenv'
dotenv.config()

const my_host = process.env.SQL_LOCALHOST;

export default {
	/**
   * Establece la conexión a la base de datos MySQL utilizando un pool de conexiones.
   * @async
   * @function mySQLConnection
   * @returns {Promise<mysql.Pool>} Devuelve el pool de conexiones a MySQL.
   * @throws {Error} Lanza un error si no se puede establecer la conexión con la base de datos.
   */

	mySQLConnection: async () => {

		const pool = mysql.createPool({
			host: my_host,
			user: process.env.SQL_USER,
			password: process.env.SQL_PASS,
			database: process.env.SQL_BBDD,
			waitForConnections: true,
			connectionLimit: 20,
			queueLimit: 0
		})

		return pool
	}
}