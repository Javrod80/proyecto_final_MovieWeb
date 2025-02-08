import { executeDbOperation } from '../utils/dbOperations.js';

const collectionName = process.env.COLL_FAV;

const crudMongoDB = {
    insertFavorites: async (userId, movie) => {
        return executeDbOperation(collectionName, (collection) =>
            collection.insertOne({ userId, ...movie })
        );
    },

    getFavorites: async (userId) => {
        return executeDbOperation(collectionName, (collection) =>
            collection.find({ userId }).toArray()
        );
    },

    deleteFavorite: async (userId, movieId) => {
        return executeDbOperation(collectionName, (collection) =>
            collection.deleteOne({ userId, id: movieId })
        );
    }
};

export default crudMongoDB;
