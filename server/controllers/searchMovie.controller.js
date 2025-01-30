import fetch from 'node-fetch';




console.log('OMDB_API_KEY:', process.env.OMDB_API_KEY);
export default {
    searchMovie: async (req, res) => {

        const apiKey = process.env.OMDB_API_KEY;
        const { title } = req.query;

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