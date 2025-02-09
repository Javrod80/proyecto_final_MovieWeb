import { Router } from 'express';
import  userController from '../controllers/users.controller.js';
import searchMovieController from '../controllers/searchMovie.controller.js';
import detailsController from '../controllers/details.controller.js';
import favoritesController from '../controllers/favorites.controller.js';
import getFavorites from '../controllers/getFavorites.controller.js';
import watchHistoryController from '../controllers/watchHistory.controller.js';
import reviewsController from '../controllers/reviews.controller.js';
import getReviewsController from '../controllers/getReviews.controller.js';
import deleteReviewsController from '../controllers/deleteReviews.controller.js';
import updateReviewsController from '../controllers/updateReviews.controller.js';
import verifyToken from '../utils/verifyToken.js';





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

// Ruta para watch history
router.get('/movieapp/v1/watched/watch-history/:user_id', watchHistoryController.getWatchHistory);
router.post('/movieapp/v1/watched/add-watch-history', watchHistoryController.addWatchHistory);

//Rutas para insertar y obtener reseñas
router.get('/movieapp/v1/reviews/:movieId', getReviewsController.getReviews);
router.post('/movieapp/v1/reviews/add-review', reviewsController.insertReview);

// Rutas para editar y borrar las reseñas
router.delete('/movieapp/v1/reviews/delete-review/:reviewId',verifyToken , deleteReviewsController.deleteReview);
router.put('/movieapp/v1/reviews/update-review/:reviewId', verifyToken ,updateReviewsController.updateReviews);


export { router };