import fetch from 'node-fetch';



export default {
    /**
     * Obtiene los detalles de una película a partir de su `imdbID` usando la API OMDB.
     * @async
     * @function getMovieDetails
     * @param {import("express").Request} req - Objeto de solicitud de Express, que contiene el `imdbID` en los parámetros de la ruta.
     * @param {import("express").Response} res - Objeto de respuesta de Express, que enviará los detalles de la película o el error de la operación.
     * @returns {Promise<void>} Responde con los detalles de la película o un error si no se encuentra la película o hay un problema con la API.
     * @throws {Error} Lanza un error si la respuesta de la API no es correcta o si ocurre algún problema al obtener los detalles.
     */

    getMovieDetails: async (req, res) => {

        const { imdbID } = req.params;
        const apiKey = process.env.OMDB_API_KEY;

        try {
            // Realizando la solicitud para obtener detalles de la película por su imdbID
            const response = await fetch(`https://www.omdbapi.com/?i=${imdbID}&apikey=${apiKey}`);

            if (!response.ok) {
                throw new Error("Error en la respuesta de la API");
            }
            const movieDetails = await response.json(); // Obtener los detalles de la película en formato JSON
            if (movieDetails.Response === "False") {
                return res.status(404).json({ message: "Película no encontrada" });
            }

            res.json(movieDetails); // Enviar los detalles de la película al cliente
        } catch (err) {
            console.error(err); // Para depurar el error
            res.status(500).json({ error: "Error al obtener los detalles de la película" });
        }
    }


}
