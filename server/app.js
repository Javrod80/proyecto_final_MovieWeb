import express, { json, urlencoded } from 'express'
import cors from 'cors'
import { router } from './routes/routes.js'
import dotenv from 'dotenv';
import swaggerUi from "swagger-ui-express";
import swaggerDocs from "./utils/Swagger/swaggerOptions.js";
import path from 'path';
import { fileURLToPath } from 'url';


/**
 * Carga las variables de entorno desde el archivo .env
 * Configura las variables que serán usadas en el servidor.
 */
dotenv.config();
/**
 * Inicializa una instancia de aplicación Express.
 * @constant {object} app - Instancia de Express.
 */
const app = express()
/**
 * El puerto en el que el servidor estará corriendo.
 * Se obtiene de las variables de entorno o por defecto es 5000.
 * @constant {number} PORT
 */
const PORT = process.env.PORT || 5000


/**
 * Normaliza la ruta del directorio actual (__dirname) eliminando posibles prefijos de Windows.
 * Se utiliza para obtener la ruta del directorio de archivos estáticos.
 * @constant {string} __dirname - Ruta normalizada del directorio actual.
 * @constant {string} normalizedPath - Ruta absoluta para servir archivos desde la carpeta `files`.
 */ 
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const normalizedPath = path.resolve(__dirname.replace(/^\\/, ''), 'files');

/**
 * Middleware para servir la carpeta "files".
 * Exponen el contenido estático del directorio `files` en la URL base `/files`.
 */
app.use('/files', express.static(normalizedPath));

/**
 * Middleware para habilitar el uso de CORS (Cross-Origin Resource Sharing).
 * Permite que recursos sean accedidos desde diferentes orígenes.
 */
app.use(cors())

/**
 * Middleware para parsear cuerpos de solicitudes HTTP con datos URL-encoded.
 * @property {boolean} extended - Si es `false`, usa la biblioteca `querystring`.
 */
app.use(express.json());
/**
 * Middleware para parsear cuerpos de solicitudes HTTP con datos URL-encoded.
 * @property {boolean} extended - Si es `false`, usa la biblioteca `querystring`.
 */
app.use(urlencoded({ extended: false }))

/**
 * Configuración de Swagger UI para la documentación de la API.
 * Se accede en `/api-docs` para visualizar y probar los endpoints disponibles.
 */

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs, { explorer: true }));

/**
 * Endpoint de prueba simple para confirmar que el servidor está activo.
 * Responde con un mensaje JSON.
 * @name TestEndpoint
 * @route {GET} /test
 * @returns {object} JSON con un mensaje de estado del servidor.
 */
app.get('/test', (req, res) => {
	res.json({
		mensaje: 'Server activo'
	})
})
/**
 * Configuración de las rutas principales de la aplicación.
 * Importa y utiliza todas las rutas definidas en el archivo `routes.js`.
 */
app.use(router)
/**
 * Inicia el servidor y lo pone a escuchar en el puerto especificado.
 * Muestra en consola un mensaje confirmando que el servidor está corriendo.
 */
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});