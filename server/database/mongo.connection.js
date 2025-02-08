import { MongoClient } from 'mongodb';
import dotenv from 'dotenv'
dotenv.config()


const url = process.env.URI_MONGOLOCAL
const client = new MongoClient(url);


export default {

  connectToMongo: async () => {
    
      await client.connect(); 
      //console.log('Conexión a MongoDB establecida');
    
    return client;
  },
  
  closeClient: async () => {
    await client.close();
   // console.log('Conexión a MongoDB cerrada');
  }
}