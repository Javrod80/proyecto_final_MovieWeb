import crudMongoDB from "../models/MongoModels/favorites.js";




export default {
    addFavorites: async (req, res) => {
       // console.log("Cuerpo de la petición:", req.body); 

        const{userId , ...movie} = req.body;


        if (!userId || !movie) {
            return res.status(400).json({ message: "Faltan datos requeridos" });
        }

        try {
            const result = await crudMongoDB.insertFavorites(userId, movie);
            res.status(201).json({ message: 'Película agregada a favoritos', result });
        } catch (error) {
            console.error('Error al agregar a favoritos:', error);
            res.status(500).json({ message: 'Error al agregar la película a favoritos' });
        }
    }
};

