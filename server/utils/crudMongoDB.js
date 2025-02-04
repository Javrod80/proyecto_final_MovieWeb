import {MongoClient} from 'mongodb';
import mongoConnection from '../database/mongo.connection.js';

const dbName = 'movieDatabase';
const collectionName = 'favorites';
const collectionNameReviews = 'movieReviews';

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
            const result = await collection.find({ userId: userId }).toArray();
         //   console.log('Resultado de la consulta con find:', result);
            return result;
        } finally {
            await mongoConnection.closeClient(client);
        }
    },

    deleteFavorite: async (userId, movieId) => {
        const client = await mongoConnection.connectToMongo();
        const db = client.db(dbName);
        const collection = db.collection(collectionName);

        try {
            const result = await collection.deleteOne({ userId: userId, id: movieId });
            return result;
        } finally {
            await mongoConnection.closeClient(client);
        }
    },


    getMovieReviews: async (movieId) => {
        const client = await mongoConnection.connectToMongo(); 
        const db = client.db(dbName);
        const collection = db.collection(collectionNameReviews);

        try {
            return await collection.find({ movieId: movieId }).toArray();
        } finally {
            await mongoConnection.closeClient(client); 
        }
    },

    addMovieReview: async (userId, movieId, rating, review) => {
        const client = await mongoConnection.connectToMongo(); 
        const db = client.db(dbName);
        const collection = db.collection(collectionNameReviews);

        try {
            return await collection.insertOne({ userId, movieId, rating, review, createdAt: new Date() });
        } finally {
            await mongoConnection.closeClient(client); 
        }
    },









};