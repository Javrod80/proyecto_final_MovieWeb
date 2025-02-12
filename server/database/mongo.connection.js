import { MongoClient } from 'mongodb';
import dotenv from 'dotenv'
dotenv.config()


const url = process.env.URI_MONGOLOCAL
const client = new MongoClient(url);


export default {
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
