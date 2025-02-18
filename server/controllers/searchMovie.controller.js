import fetch from 'node-fetch';





export default {
    /**
    * Realiza una búsqueda de películas usando la API OMDB.
    * @async
    * @function searchMovie
    * @param {import("express").Request} req - Objeto de solicitud de Express que contiene los parámetros de consulta (en este caso, el título de la película).
    * @param {import("express").Response} res - Objeto de respuesta de Express que se utiliza para enviar los resultados de la búsqueda o un error al cliente.
    * @returns {Promise<void>} Responde con los resultados de la búsqueda de películas si se encuentran, o con un mensaje de error si ocurre un problema.
    * @throws {Error} Lanza un error si hay un problema con la solicitud a la API o si falta algún dato requerido.
    */
    searchMovie: async (req, res) => {

        const apiKey = process.env.OMDB_API_KEY;
        const { title } = req.query;
        //  console.log('OMDB_API_KEY:', process.env.OMDB_API_KEY);
        if (!apiKey) {
            console.error("API key is missing");
            return res.status(500).json({ error: "API key is missing" });
        }

        if (!title) {
            console.error("Title query parameter is missing");
            return res.status(400).json({ error: "Title query parameter is missing" });
        }

        try {
            const response = await fetch(`https://www.omdbapi.com/?apikey=${apiKey}&s=${title}`);
            if (!response.ok) {
                throw new Error("Error en la respuesta de la API");
            }
            const data = await response.json();
            if (data.Response === "False") {
                return res.status(404).json({ error: "No se encontraron películas" });
            }
            res.json(data);
        } catch (err) {
            console.error('Error al consultar la API:', err);
            res.status(500).json({ error: "Error al consultar la API" });
        }
    }
};