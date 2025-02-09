import { getDataFromCollection } from './genericCrud.js';
import { insertIntoCollection } from './genericCrud.js';
import { deleteFromCollection } from './genericCrud.js';
import { updateInCollection } from './genericCrud.js';
import dotenv from 'dotenv';
dotenv.config();

const collectionName = process.env.COLL_FAV;

const crudMongoDB = {

    // Función para agregar una película a favoritos
     insertFavorites:async (userId, movie) => {
        return insertIntoCollection(collectionName, { userId, ...movie });
    },

    // Función específica para obtener favoritos de un usuario
    getFavorites: async (userId) => {
        return getDataFromCollection(collectionName, { userId });
    },

    // Función para eliminar una película de favoritos
     deleteFavorite: async (userId, movieId) => {
        return deleteFromCollection(collectionName, { userId, id: movieId });
    },

    // Función para actualizar una película en favoritos (ejemplo)
    updateFavorite: async (userId, movieId, newFavoriteData) => {
        return updateInCollection('favorites', { userId, id: movieId }, newFavoriteData);
    }
};

export default crudMongoDB;
