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


     // Obtener todas las reseñas de una película
     getMovieReviews: async (movieId) => {
        const db = client.db(mydb);
        const collection = db.collection('movieReviews');
        return await collection.find({ movieId: movieId }).toArray();
    },

    // Agregar una reseña de una película
    addMovieReview: async (userId, movieId, rating, review) => {
        const db = client.db(mydb);
        const collection = db.collection('movieReviews');
        return await collection.insertOne({ userId: userId, movieId: movieId, rating: rating, review: review, createdAt: new Date() });
    },









};