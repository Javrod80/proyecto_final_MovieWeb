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
import verifyToken from '../utils/Token/verifyToken.js';
import deleteFavoritesController from '../controllers/deleteFavorites.controller.js';
import deleteHistoryController from '../controllers/deleteHistory.controller.js';
import updateUserController from '../controllers/updateUser.controller.js';
import deleteUserController from '../controllers/deleteUser.controller.js';
import resetPasswordController from '../controllers/resetPassword.controller.js';
import adminController from '../adminControllers/admin.controller.js';
import recoverPasswordController from '../controllers/recoverPassword.controller.js';
import isAdmin from '../utils/Admin/isAdmin.js';




/**
 * Router para las rutas del API de la aplicación de películas.
 * @module router
 */


const router = Router();


// Rutas del usuario
// Rutas del usuario
/**
 * Ruta para registrar un nuevo usuario.
 * @name POST /movieapp/v1/users/signup
 * @function
 * @memberof module:router
 * @param {Object} req - El objeto de la solicitud.
 * @param {Object} res - El objeto de la respuesta.
 */
router.post('/movieapp/v1/users/signup', userController.signupUser); // Registro
/**
 * Ruta para iniciar sesión de un usuario.
 * @name POST /movieapp/v1/users/login
 * @function
 * @memberof module:router
 * @param {Object} req - El objeto de la solicitud.
 * @param {Object} res - El objeto de la respuesta.
 */
router.post('/movieapp/v1/users/login', userController.loginUser);   // Inicio de sesión
/**
 * Ruta para actualizar los detalles de un usuario.
 * @name PUT /movieapp/v1/users/update-user/:userId
 * @function
 * @memberof module:router
 * @param {string} userId - El ID del usuario a actualizar.
 * @param {Object} req - El objeto de la solicitud.
 * @param {Object} res - El objeto de la respuesta.
 */
router.put('/movieapp/v1/users/update-user/:userId', verifyToken ,updateUserController.updateUser); // Actualizar usuario
/**
 * Ruta para eliminar un usuario.
 * @name DELETE /movieapp/v1/users/delete-user/:userId
 * @function
 * @memberof module:router
 * @param {string} userId - El ID del usuario a eliminar.
 * @param {Object} req - El objeto de la solicitud.
 * @param {Object} res - El objeto de la respuesta.
 */
router.delete('/movieapp/v1/users/delete-user/:userId', verifyToken ,deleteUserController.deleteUser); // Eliminar usuario


/**
 * Ruta para restablecer la contraseña de un usuario.
 * @name PUT /movieapp/v1/users/reset-password
 * @function
 * @memberof module:router
 * @param {string} token - El token JWT recibido en la URL.
 * @param {Object} req - El objeto de la solicitud.
 * @param {Object} res - El objeto de la respuesta.
 */
router.post('/movieapp/v1/users/reset-password', verifyToken, resetPasswordController.requestPasswordReset); // Restablecer contraseña
router.put('/movieapp/v1/users/new-password',verifyToken, resetPasswordController.resetPassword); // Nuevacontraseña
router.post('/movieapp/v1/users/recovery-mail', recoverPasswordController.recoverPassword); // Recuperar contraseña


// Ruta de búsqueda de películas
/**
 * Ruta para buscar películas.
 * @name GET /movieapp/v1/movies/search
 * @function
 * @memberof module:router
 * @param {Object} req - El objeto de la solicitud.
 * @param {Object} res - El objeto de la respuesta.
 */
router.get('/movieapp/v1/movies/search', searchMovieController.searchMovie); // Búsqueda de películas
// Ruta de detalles de películas
/**
 * Ruta para obtener detalles de una película.
 * @name GET /movieapp/v1/movies/:imdbID
 * @function
 * @memberof module:router
 * @param {string} imdbID - El ID IMDb de la película.
 * @param {Object} req - El objeto de la solicitud.
 * @param {Object} res - El objeto de la respuesta.
 */
router.get('/movieapp/v1/movies/:imdbID', detailsController.getMovieDetails); // Detalles de una película

// Ruta de favoritos
/**
 * Ruta para agregar una película a los favoritos.
 * @name POST /movieapp/v1/favorites/add-favorite
 * @function
 * @memberof module:router
 * @param {Object} req - El objeto de la solicitud.
 * @param {Object} res - El objeto de la respuesta.
 */
router.post('/movieapp/v1/favorites/add-favorite', favoritesController.addFavorites); // Añadir a favoritos
/**
 * Ruta para obtener los favoritos de un usuario.
 * @name GET /movieapp/v1/favorites/all-favorites
 * @function
 * @memberof module:router
 * @param {Object} req - El objeto de la solicitud.
 * @param {Object} res - El objeto de la respuesta.
 */
router.get('/movieapp/v1/favorites/all-favorites', getFavorites.getFavorites); // Obtenemos los favoritos del usuario
/**
 * Ruta para eliminar una película de los favoritos.
 * @name DELETE /movieapp/v1/favorites/delete-favorites/:movieId
 * @function
 * @memberof module:router
 * @param {string} movieId - El ID de la película a eliminar.
 * @param {Object} req - El objeto de la solicitud.
 * @param {Object} res - El objeto de la respuesta.
 */

router.delete('/movieapp/v1/favorites/delete-favorites/:movieId', verifyToken ,deleteFavoritesController.deleteFavorites)// Eliminar de favoritos


// Rutas para el historial de películas vistas
/**
 * Ruta para obtener el historial de películas vistas de un usuario.
 * @name GET /movieapp/v1/watched/watch-history/:user_id
 * @function
 * @memberof module:router
 * @param {string} user_id - El ID del usuario.
 * @param {Object} req - El objeto de la solicitud.
 * @param {Object} res - El objeto de la respuesta.
 */
router.get('/movieapp/v1/watched/watch-history/:user_id', watchHistoryController.getWatchHistory);// Obtenemos el watch history
/**
 * Ruta para agregar una película al historial de un usuario.
 * @name POST /movieapp/v1/watched/add-watch-history
 * @function
 * @memberof module:router
 * @param {Object} req - El objeto de la solicitud.
 * @param {Object} res - El objeto de la respuesta.
 */
router.post('/movieapp/v1/watched/add-watch-history', watchHistoryController.addWatchHistory);// Agregamos una pelicula al watch history
/**
 * Ruta para eliminar una película del historial de un usuario.
 * @name DELETE /movieapp/v1/watched/delete-watch-history/:userId/:movieId
 * @function
 * @memberof module:router
 * @param {string} userId - El ID del usuario.
 * @param {string} movieId - El ID de la película a eliminar.
 * @param {Object} req - El objeto de la solicitud.
 * @param {Object} res - El objeto de la respuesta.
 */
router.delete('/movieapp/v1/watched/delete-watch-history/:userId/:movieId', verifyToken ,deleteHistoryController.deleteWatchHistoryUser);// Eliminamos una pelicula del watch history



// Rutas para las reseñas
/**
 * Ruta para obtener las reseñas de una película.
 * @name GET /movieapp/v1/reviews/:movieId
 * @function
 * @memberof module:router
 * @param {string} movieId - El ID de la película.
 * @param {Object} req - El objeto de la solicitud.
 * @param {Object} res - El objeto de la respuesta.
 */
router.get('/movieapp/v1/reviews/:movieId', getReviewsController.getReviews);// Obtenemos las reseñas
/**
 * Ruta para agregar una reseña de película.
 * @name POST /movieapp/v1/reviews/add-review
 * @function
 * @memberof module:router
 * @param {Object} req - El objeto de la solicitud.
 * @param {Object} res - El objeto de la respuesta.
 */

router.post('/movieapp/v1/reviews/add-review', reviewsController.insertReview);// Agregamos una reseña
/**
 * Ruta para eliminar una reseña.
 * @name DELETE /movieapp/v1/reviews/delete-review/:reviewId
 * @function
 * @memberof module:router
 * @param {string} reviewId - El ID de la reseña a eliminar.
 * @param {Object} req - El objeto de la solicitud.
 * @param {Object} res - El objeto de la respuesta.
 */
router.delete('/movieapp/v1/reviews/delete-review/:reviewId',verifyToken , deleteReviewsController.deleteReview);// Eliminamos una reseña
/**
 * Ruta para actualizar una reseña.
 * @name PUT /movieapp/v1/reviews/update-review/:reviewId
 * @function
 * @memberof module:router
 * @param {string} reviewId - El ID de la reseña a actualizar.
 * @param {Object} req - El objeto de la solicitud.
 * @param {Object} res - El objeto de la respuesta.
 */
router.put('/movieapp/v1/reviews/update-review/:reviewId', verifyToken ,updateReviewsController.updateReviews);// Actualizamos una reseña



// Rutas del administrador
/**
 * Ruta para obtener todos los usuarios.
 * @name GET /movieapp/v1/admin/all-data-users
 * @function
 * @memberof module:router
 * @param {Object} req - El objeto de la solicitud.
 * @param {Object} res - El objeto de la respuesta.
 */
//router.get('/movieapp/v1/admin/users/all-data-users', adminController); // Obtenemos todos los usuarios
/**
 * Ruta para obtener todas las películas vistas.
 * @name GET /movieapp/v1/admin/all-movies-watched
 * @function
 * @memberof module:router
 * @param {Object} req - El objeto de la solicitud.
 * @param {Object} res - El objeto de la respuesta.
 */
//router.get('/movieapp/v1/admin/all-movies-watched', adminController);//todas las peliculas vistas
/**
 * Ruta para obtener todas las reseñas.
 * @name GET /movieapp/v1/admin/get-all-reviews
 * @function
 * @memberof module:router
 * @param {Object} req - El objeto de la solicitud.
 */
router.get('/movieapp/v1/admin/get-all-reviews', isAdmin ,adminController.getAllReviews);//todas las reseñas
/**
 * Ruta para obtener todas las peliculas favoritas.
 * @name GET /movieapp/v1/admin/all-favorites
 * @function
 * @memberof module:router
 * @param {Object} req - El objeto de la solicitud.
 * @param {Object} res - El objeto de la respuesta.
 */
router.get('/movieapp/v1/admin/get-all-favorites',isAdmin ,adminController.getAllFavorites);//todas las peliculas favoritas



export { router };