import mongoConnection from '../../database/mongo.connection.js';
import dotenv from 'dotenv';
dotenv.config();

let client;

/**
 * Obtiene el cliente de la base de datos MongoDB.
 * Si el cliente no existe, establece una nueva conexión.
 * @async
 * @function getClient
 * @returns {Promise<MongoClient>} Devuelve una promesa con el cliente MongoDB.
 */
export const getClient = async () => {
    if (!client) {
        client = await mongoConnection.connectToMongo();  
    }
    return client;
};

/**
 * Función para manejar la conexión y realizar operaciones en la colección de MongoDB.
 * @async
 * @function executeDbOperation
 * @param {string} collectionName - El nombre de la colección en la base de datos.
 * @param {Function} operation - La operación que se desea ejecutar sobre la colección.
 * @returns {Promise<*>} Devuelve una promesa con el resultado de la operación ejecutada.
 * @throws {Error} Si ocurre un error durante la ejecución de la operación, se lanza una excepción.
 */

// Función para manejar la conexión y realizar operaciones en la colección
 const executeDbOperation = async (collectionName, operation) => {
    const client = await getClient();
     const session = client.startSession();
    try {
        const db = client.db(process.env.MONGO_BBDD);
        const collection = db.collection(collectionName);
        const  result =  await operation(collection);
        return result;  

    }  catch (error) {
        console.error('Error al ejecutar la operación en la colección:', error);
        throw error;
    } finally {
    await session.endSession();
   
    }

   
};
export {executeDbOperation};