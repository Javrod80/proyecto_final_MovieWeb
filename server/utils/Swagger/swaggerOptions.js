import swaggerJsDoc from "swagger-jsdoc";
import YAML from 'yamljs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const usersSwagger = YAML.load(path.resolve(__dirname, './users.yaml'));
const favoritesSwagger = YAML.load(path.resolve(__dirname, './favorites.yaml'));
const moviesSwagger = YAML.load(path.resolve(__dirname, './movies.yaml'));
const reviewsSwagger = YAML.load(path.resolve(__dirname, './reviews.yaml'));
const watchHistorySwagger = YAML.load(path.resolve(__dirname, './watchHistory.yaml')); 
const adminSwagger = YAML.load(path.resolve(__dirname, './admin.yaml'));

const swaggerOptions = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Movies API",
            version: "1.0.0",
            description: "Documentación de la API con Swagger",
            contact: {
                name: "Javier",
                email: 'mailitodeprueba25@gmail.com',
            },
        },
        tags: [
            { name: 'Users', description: 'Operaciones relacionadas con usuarios' },
            { name: 'Movies', description: 'Operaciones relacionadas con las peliculas' },
            { name: 'Favorites', description: 'Operaciones relacionadas con las peliculas favoritas' },
            { name: 'Reviews', description: 'Operaciones relacionadas con las reseñas' },
            { name: 'Watch History', description: 'Operaciones relacionadas con el historial de las peloculas vistas' },
            { name: 'Admin', description: 'Operaciones relacionadas con el Admin' },
            // ... otros tags
        ],
        servers: [
            {
                url: "http://localhost:5000",
                 description: "Servidor local"
            },
        ],
    },
    apis: ["./utils/swagger/*.yaml"],
};

const swaggerDocs = swaggerJsDoc({
    ...swaggerOptions,
    definition: {
        ...swaggerOptions.definition,
        paths: {
            ...usersSwagger.paths,
            ...moviesSwagger.paths,
            ...favoritesSwagger.paths,
            ...reviewsSwagger.paths,
            ...watchHistorySwagger.paths
        },
    },
});

export default swaggerDocs;
