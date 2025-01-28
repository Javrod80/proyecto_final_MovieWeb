import { Router } from 'express';
import favorites from '../controllers/favorites.controller.js';
import token from '../utils/verifyToken.js';
import users from '../controllers/users.controller.js';



const router = Router();

//BBDD MongoDB
router.get('/movieapp/v1/favorites/all-favorites', favorites.getFavorites);

router.post('/movieapp/v1/favorites/add-favorite', token.verifyToken, favorites.addFavorite);

router.post('/movieapp/v1/users/login',users.loginUser);









export { router };