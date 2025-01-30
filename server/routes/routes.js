import { Router } from 'express';
import  userController from '../controllers/users.controller.js';
import searchMovieController from '../controllers/searchMovie.controller.js';





const router = Router();

//BBDD MongoDB
//router.get('/movieapp/v1/favorites/all-favorites', favorites.getFavorites);

//router.post('/movieapp/v1/favorites/add-favorite', token.verifyToken, favorites.addFavorite);





// Rutas del usuario
router.post('/movieapp/v1/users/signup', userController.signupUser); // Registro
router.post('/movieapp/v1/users/login', userController.loginUser);   // Inicio de sesión

// Rutas de búsqueda de películas
router.get('/movieapp/v1/movies/search', searchMovieController.searchMovie); // Búsqueda de películas





export { router };