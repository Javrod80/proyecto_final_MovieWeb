import crudMysql from "../utils/crudMysql";

export default {
    getWatchHistory: async (req, res) => {
        const { user_id } = req.params;
        const watchHistory = await crudMysql.watchHistory([user_id]);
        res.json(watchHistory);
    },
}