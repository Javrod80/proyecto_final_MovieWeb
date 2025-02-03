import crudMysql from "../utils/crudMysql.js";

export default {
    getWatchHistory: async (req, res) => {
        const { user_id } = req.params;
        const watchHistory = await crudMysql.watchHistory([user_id]);
        res.json(watchHistory);
    },


    addWatchHistory: async (req, res) => {

      //  console.log('Datos recibidos:', req.body);

        const { user_id, movie_id, title, poster } = req.body;

        if (!user_id || !movie_id || !title || !poster) {
            return res.status(400).json({ error: "user_id es requerido" });
        }

        try {
            const watchHistory = await crudMysql.addWatchHistory([user_id, movie_id, title, poster, new Date()]);
            res.json(watchHistory);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: "Error al agregar la película al historial" });
        }
    }
}