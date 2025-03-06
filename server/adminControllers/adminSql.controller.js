import {getAllUsers, getAllWatchHistory}from '../models/MySQLModels/AdminSQLModels/adminSql.model.js';
import handleRequest from './admin.controller.js';

export default {
    getAllUsers: (req, res) => handleRequest(getAllUsers, req, res),
    getAllWatchHistory: (req, res) => handleRequest(getAllWatchHistory, req, res),
};
