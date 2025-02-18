import { MongoClient } from 'mongodb';
import dotenv from 'dotenv'
dotenv.config()


const url = process.env.URI_MONGOLOCAL
const client = new MongoClient(url);


export default {
  /**
 * Establece la conexión a la base de datos MongoDB.
 * @async
 * @function connectToMongo
 * @returns {Promise<MongoClient>} Devuelve el cliente de MongoDB si la conexión se establece correctamente.
 * @throws {Error} Lanza un error si no se puede conectar a la base de datos.
 */

  connectToMongo: async () => {
    try {
      // Realizar un ping para verificar si la conexión está activa
      await client.connect();
      await client.db().command({ ping: 1 });
     // console.log('Conexión a MongoDB establecida');
      return client;
    } catch (error) {
      console.error('Error al conectar a MongoDB:', error);
      throw error; 
    }
  },
  /**
     * Cierra la conexión con la base de datos MongoDB.
     * @async
     * @function closeClient
     * @returns {Promise<void>} Devuelve un mensaje de éxito si la conexión se cierra correctamente, o un mensaje si la conexión ya está cerrada.
     * @throws {Error} Lanza un error si ocurre un problema al cerrar la conexión.
     */
  closeClient: async () => {
    try {
      if (client.topology && client.topology.isConnected()) {
        await client.close();
        console.log('Conexión a MongoDB cerrada');
      } else {
        console.log('La conexión ya está cerrada');
      }
    } catch (error) {
      console.error('Error al cerrar la conexión de MongoDB:', error);
    }
  }
}
