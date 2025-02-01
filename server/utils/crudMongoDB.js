import {MongoClient} from 'mongodb';
import mongoConnection from '../database/mongo.connection.js';

const dbName = 'movieDatabase';
const collectionName = 'favorites';

export default {
    insertFavorites: async (userId, movie) => {
        const client = await mongoConnection.connectToMongo();
        const db = client.db(dbName);
        const collection = db.collection(collectionName);

        try {
            const result = await collection.insertOne({ userId, ...movie });
            return result;
        } finally {
            await mongoConnection.closeClient(client);
        }
    },

    getFavorites: async (userId) => {
        const client = await mongoConnection.connectToMongo();
        const db = client.db(dbName);
        const collection = db.collection(collectionName);

        try {
            const result = await collection.find({userId}).toArray();
            return result;
        } finally {
            await mongoConnection.closeClient(client);
        }
    }
};