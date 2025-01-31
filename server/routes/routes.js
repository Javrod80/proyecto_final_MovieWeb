import { Router } from 'express';
import  userController from '../controllers/users.controller.js';
import searchMovieController from '../controllers/searchMovie.controller.js';
import detailsController from '../controllers/details.controller.js';
import favoritesController from '../controllers/favorites.controller.js';
import getFavorites from '../controllers/getFavorites.controller.js';






const router = Router();


// Rutas del usuario
router.post('/movieapp/v1/users/signup', userController.signupUser); // Registro
router.post('/movieapp/v1/users/login', userController.loginUser);   // Inicio de sesión

// Ruta de búsqueda de películas
router.get('/movieapp/v1/movies/search', searchMovieController.searchMovie); // Búsqueda de películas

// Ruta de detalles de películas
router.get('/movieapp/v1/movies/:imdbID', detailsController.getMovieDetails); // Detalles de una película

// Ruta de favoritos
router.post('/movieapp/v1/favorites/add-favorite', favoritesController.addFavorites); // Añadir a favoritos

// Ruta Obtener los favoritos del usuario
router.get('/movieapp/v1/favorites/all-favorites', getFavorites.getFavorites); // Obtenemos los favoritos del usuario

export { router };