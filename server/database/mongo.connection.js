import { MongoClient } from 'mongodb';


const url = "mongodb://127.0.0.1:27017/"

export default {

  connectToMongo: async () => {
    const client = new MongoClient(url)
    await client.connect()

    return client
  },

  closeClient: async () => {
    const client = new MongoClient(url)
    await client.close()

    return client
  }
}