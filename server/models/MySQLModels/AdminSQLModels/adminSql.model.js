import usersModel from '../users.models.js';
import watchHistoryModel from '../watchHistory.models.js';
import dotenv from 'dotenv';
dotenv.config();

const tableNameU = process.env.TAB_FIRST;
const tableNameW = process.env.TAB_SECOND;

 async function getData(model, tableName) {
    return await model.getAllData(tableName);
 }
export default {
    getAllUsers: async () => {
        return await getData(usersModel, tableNameU);
    },
    getAllWatchHistory: async () => {
        return await getData(watchHistoryModel, tableNameW);
    }
}



