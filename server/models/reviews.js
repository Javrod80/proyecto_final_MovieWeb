import { executeDbOperation } from '../utils/dbOperations.js';

const collectionName = process.env.COLL_REV;

const crudMongoDBReviews = {
    getMovieReviews: async (movieId) => {
        return executeDbOperation(collectionName, (collection) =>
            collection.find({ movieId }).toArray()
        );
    },

    addMovieReview: async (userId, movieId, rating, review) => {
        return executeDbOperation(collectionName, (collection) =>
            collection.insertOne({ userId, movieId, rating, review, createdAt: new Date() })
        );
    }
};

export default crudMongoDBReviews;
