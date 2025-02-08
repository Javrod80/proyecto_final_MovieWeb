import mongoConnection from '../../database/mongo.connection.js';
import dotenv from 'dotenv';
dotenv.config();



// Función para manejar la conexión y realizar operaciones en la colección
 const executeDbOperation = async (collectionName, operation) => {
    const client = await mongoConnection.connectToMongo();
    const db = client.db(process.env.MONGO_BBDD);
    const collection = db.collection(collectionName);

    try {
        return await operation(collection);

    } catch (error) {
        console.error('Error al realizar la operación en la colección:', error);
        throw error;
    
    } finally {
        if (client) {
            await mongoConnection.closeClient(client);
        }
    }
};
export {executeDbOperation};