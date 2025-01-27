import { Router } from 'express';
import favorites from '../controllers/favorites.controller.js';
import token from '../utils/verifyToken.js';

const router = Router();

//BBDD MongoDB
router.get('/movieapp/v1/favorites/all-favorites', favorites.getFavorites);