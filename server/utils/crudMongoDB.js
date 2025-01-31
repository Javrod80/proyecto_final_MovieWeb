import {MongoClient} from 'mongodb';
import mongoConnection from '../database/mongo.connection.js';

const dbName = 'movieDatabase';
const collectionName = 'favorites';

export default {
    insertFavorites: async (data) => {
        const client = await mongoConnection.connectToMongo();
        const db = client.db(dbName);
        const collection = db.collection(collectionName);

        try {
            const result = await collection.insertOne(data);
            return result;
        } finally {
            await mongoConnection.closeClient(client);
        }
    },

    getFavorites: async () => {
        const client = await mongoConnection.connectToMongo();
        const db = client.db(dbName);
        const collection = db.collection(collectionName);

        try {
            const result = await collection.find({}).toArray();
            return result;
        } finally {
            await mongoConnection.closeClient(client);
        }
    }
};