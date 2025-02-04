import crudMongoDB from "../utils/crudMongoDB.js"


export default {
    insertReview: async (userId, movieId, rating, review) => {
        return crudMongoDB.addMovieReview(userId, movieId, rating, review);
    },

    getReviews: async (movieId) => {
        return crudMongoDB.getMovieReviews(movieId);
    }



}