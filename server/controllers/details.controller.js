import fetch from 'node-fetch';



export default {

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
