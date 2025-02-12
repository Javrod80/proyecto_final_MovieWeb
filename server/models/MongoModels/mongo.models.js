import mongoConnection from '../../database/mongo.connection.js';
import dotenv from 'dotenv';
dotenv.config();

let client;

const getClient = async () => {
    if (!client) {
        client = await mongoConnection.connectToMongo();  
    }
    return client;
};


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